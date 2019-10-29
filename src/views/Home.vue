<template>
  <div>
    <v-card>
      <v-card-title class="headline font-weight-regular black white--text">
        <span style="font-size:32px">
          <b>Home</b>
        </span>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap align-center>
          <v-flex xs12 md12 lg12>
            <br />
            <v-col>
              <v-card class="mx-auto" outlined>
                <div class="text-center">
                  <MultifileInput
                    filetype=".c"
                    label="Select source code files"
                    :value="filelist"
                    v-model="filelist"
                  />
                  <v-btn rounded color="rgba(0,0,0,.87)" dark @click="submit()"
                    >Submit</v-btn
                  >
                </div>
                <br />
              </v-card>
            </v-col>
            <br />
            <v-col>
              <ErrorAlert
                v-if="error"
                :show="error"
                :title="error_title"
                :message="error_msg"
              />
              <v-card v-else class="mx-auto" outlined>
                <br />
                <div v-if="loading" class="text-center">
                  <v-progress-circular
                    :size="70"
                    :width="7"
                    color="black"
                    indeterminate
                  ></v-progress-circular>
                </div>
                <div
                  v-if="!loading && similarity_score.length > 0"
                  class="text-center"
                >
                  <div class="text-right">
                    <v-btn
                      rounded
                      color="rgba(0,0,0,.87)"
                      style="margin-right:10px;"
                      dark
                      @click="exportCSV()"
                      >Export CSV</v-btn
                    >
                  </div>
                  <br />
                  <DataTable
                    :headers="datatable_headers"
                    :datas="formattedSimScore"
                    @row_clicked="handleTableClick"
                  ></DataTable>
                  <SourceCodeDialog
                    :title="dialog_title"
                    :dialog="dialog"
                    @close_dialog="handleCloseDialog"
                    :refer="{
                      filename: dialog_data.ref_filename,
                      fileinfo: fileinfo_list[dialog_data.ref_index].split(
                        '\n'
                      ),
                      locs: formatLOC(
                        dialog_data.ref_index,
                        dialog_data.comp_index,
                        0
                      )
                    }"
                    :comp="{
                      filename: dialog_data.comp_filename,
                      fileinfo: fileinfo_list[dialog_data.comp_index].split(
                        '\n'
                      ),
                      locs: formatLOC(
                        dialog_data.ref_index,
                        dialog_data.comp_index,
                        1
                      )
                    }"
                  />
                </div>
                <br />
              </v-card>
            </v-col>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import MultifileInput from "@/components/MultifileInput";
import DataTable from "@/components/DataTable";
import SourceCodeDialog from "@/components/SourceCodeDialog";
import ErrorAlert from "@/components/ErrorAlert";
import axios from "axios";
export default {
  name: "Home",
  components: {
    MultifileInput,
    DataTable,
    SourceCodeDialog,
    ErrorAlert
  },
  data: function() {
    return {
      filelist: [],
      filelist_processed: [],
      filelist_processed_showing: [],
      similarity_score: [],
      similar_loc: [],
      filename_list: [],
      fileinfo_list: [],
      loading: false,
      datatable_headers: [
        {
          text: "Reference File",
          align: "left",
          sortable: true,
          value: "ref_filename"
        },
        {
          text: "Compared File",
          align: "left",
          sortable: true,
          value: "comp_filename"
        },
        {
          text: "Similarity Score",
          align: "left",
          sortable: true,
          value: "sim_score"
        }
      ],
      dialog: false,
      dialog_data: {
        comp_filename: "",
        comp_index: 0,
        ref_filename: "",
        ref_index: 0,
        sim_score: 0
      },
      dialog_title: "",
      error: false,
      error_title: "",
      error_msg: ""
    };
  },
  watch: {
    filelist: function() {
      this.filelist_processed = this.processFile(this.filelist);
    }
  },
  computed: {
    formattedSimScore: function() {
      let dup = [...this.similarity_score];
      let formatted = [];
      dup.forEach((row, i) => {
        row.forEach((data, j) => {
          if (i !== j && data !== 1000) {
            formatted.push({
              ref_index: i,
              comp_index: j,
              ref_filename: this.filename_list[i],
              comp_filename: this.filename_list[j],
              sim_score: data
            });
          }
        });
      });
      return formatted;
    }
  },
  methods: {
    processFile(files) {
      let result = [];
      result = [];
      Array.from(files).forEach((file, key) => {
        const fileReader = new FileReader();
        const getResult = new Promise(() => {
          fileReader.onload = e => {
            result.push({
              id: key,
              filename: file.name,
              fileinfo: e.target.result.replace(/\\n/gim, `\\\\n`)
            });
          };
        });

        fileReader.readAsText(file);
        return getResult.then(file => {
          return file;
        });
      });
      return result;
    },
    async submit() {
      this.loading = true;
      await axios
        .post("/getsimscore", { filelist: this.filelist_processed })
        .then(result => {
          if (result.data.error) {
            this.error = true;
            this.error_title = result.data.error;
            this.error_msg = result.data.error_msg;
          } else {
            this.error = false;
            this.similarity_score = result.data["score"];
            this.similar_loc = result.data["loc"];
            this.filename_list = result.data["filelist_name"];
            this.fileinfo_list = result.data["filelist_data"];
            this.filelist_processed_showing = [...this.filelist_processed];
          }
          this.loading = false;
          // eslint-disable-next-line
        console.log("DONE")
        })
        .catch(err => {
          this.loading = false;
          alert(err);
        });
    },
    async exportCSV() {
      // eslint-disable-next-line
      console.log("Export")
      await axios
        .post(
          "/getsimscore_csv",
          { filelist: this.filelist_processed_showing },
          { responseType: "blob" }
        )
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "similarityscore.csv");
          document.body.appendChild(link);
          link.click();
        })
        .catch(err => {
          alert(err);
        });
    },
    handleTableClick(data) {
      this.dialog_title = data.ref_filename + "\t-\t" + data.comp_filename;
      this.dialog_data = data;
      this.dialog = true;
    },
    handleCloseDialog() {
      this.dialog = false;
    },
    formatLOC(index_i, index_j, pos) {
      if(index_i!==index_j){
        let loc = [...this.similar_loc[index_i][index_j]];
        let formatted = [[], []];
        loc.forEach(data => {
          data[0].forEach(index => {
            formatted[0].push(index);
          });
          data[1].forEach(index => {
            formatted[1].push(index);
          });
        });
        return formatted[pos];
      }
    }
  }
};
</script>
