<template>
  <v-app>
    <v-main>
      <v-card>
        <v-card-title>Đơn hàng từ điêm tập kết</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-form>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="selectedCollectionPoint2"
                      :items="collectionPoints"
                      label="Điểm tập kết"
                      item-title="name"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="getDataCollection">Lấy dữ liệu</v-btn>
        </v-card-actions>

        <v-data-table
          :loading="loadCollection"
          :items="itemsCollection"
          :headers="headersCollection"
        >
        </v-data-table>
      </v-card>

      <v-card>
        <v-card-title>Đơn hàng từ điểm giao dịch</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-form>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="selectedCollectionPoint"
                      :items="collectionPoints"
                      label="Điểm tập kết"
                      item-title="name"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="selectedTransactionPoint"
                      :items="transactions"
                      label="Điểm giao dịch"
                      item-title="name"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="getDataTransaction">Lấy dữ liệu</v-btn>
        </v-card-actions>

        <v-data-table
          :loading="loadTransaction"
          :items="itemsTransaction"
          :headers="headersTransaction"
        >
        </v-data-table>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { LeadService } from "../../../service/LeadService";
export default {
  watch: {
    selectedCollectionPoint: function (newCollectionPoint) {
      // Lưu ý: Bạn có thể cần thay đổi logic dưới đây để phản ánh các yêu cầu của bạn
      this.updateTransactions(newCollectionPoint);
    },
  },

  name: "StatisticalComponent",
  data() {
    return {
      selectedTransactionPoint: null, // 2 bien nay luu gia tri diem giao dich+ diem tap ket da chon trong form
      selectedCollectionPoint: null,
      selectedCollectionPoint2: null,
      fromDate: new Date().toISOString().substr(0, 10), // Giá trị mặc định là ngày hôm nay
      toDate: new Date().toISOString().substr(0, 10), // Giá trị mặc định là ngày hôm nay
      loadCollection: false,
      loadTransaction: false,
      transactions: [],
      // bien items luu thong tin don hang
      itemsCollection: [],
      itemsTransaction: [],
      headersTransaction: [
        {
          title: "ID",
          align: "start",
          sortable: false,
          key: "id",
        },
        { title: "Điểm tập kết", key: "transactionName", align: "end" },
        { title: "Thời gian gửi", key: "created_at", align: "end" },
        { title: "Cập nhật lúc", key: "updated_at", align: "end" },
        { title: "Khối lượng (g)", key: "goods_weight", align: "end" },
        { title: "Giá", key: "fee", align: "end" },
      ],
      headersCollection: [
        {
          title: "ID",
          align: "start",
          sortable: false,
          key: "id",
        },
        { title: "Điểm giao dịch", key: "collectionName", align: "end" },
        { title: "Thời gian gửi", key: "created_at", align: "end" },
        { title: "Cập nhật lúc", key: "updated_at", align: "end" },
        { title: "Khối lượng (g)", key: "goods_weight", align: "end" },
        { title: "Giá", key: "fee", align: "end" },
      ],
    };
  },
  props: {
    collectionPoints: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.setup();
  },
  methods: {
    async getDataCollection() {
      try {
        const res = await LeadService.getShipmentByCollectionPoint(
          this.selectedCollectionPoint2
        );
        if (res.error_code === 0) {
          // console.log(res.data);
          this.itemsCollection = res.data.relatedShipments;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getDataTransaction() {
      try {
        const res = await LeadService.getShipmentByTransactionPoint(
          this.selectedTransactionPoint
        );
        if (res.error_code === 0) {
          // console.log(res.data);
          this.itemsTransaction = res.data.relatedShipments;
        }
      } catch (error) {
        console.error(error);
      }
    },
    setup() {
      try {
        // this.selectedCollectionPoint = this.collectionPoints[0].name;
        // this.selectedCollectionPoint2 = this.collectionPoints[0].name;
        // this.updateTransactions(this.selectedCollectionPoint);
        console.log(this.transactions);
        console.log(this.collectionPoints);
        if (this.transactions[0]) {
          this.selectedTransactionPoint = this.transactions[0].name;
        }
      } catch (error) {
        console.log(error);
      }
    },
    updateTransactions(selectedCollectionPoint) {
      this.transactions = this.collectionPoints.find(
        (cp) => cp.name === selectedCollectionPoint
      ).transactionPoints;
    },

    formatDate(date) {
      return date
        ? new Date(date).toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "";
    },
  },
};
</script>
<style scoped>
span {
  color: black;
}
</style>
