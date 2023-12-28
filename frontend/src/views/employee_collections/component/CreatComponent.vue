<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Tạo đơn hàng đến điểm tập kết</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="collection_order.name"
                  label="Tên hàng"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="collection_order.weight"
                  label="Khối lượng"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="collection_order.type"
                  :items="['Đồ điện tử', 'Tài liệu', 'Thực phẩm']"
                  label="Loại hàng"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="submit" color="primary">Thêm đơn hàng</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Tạo đơn hàng đến điểm giao dịch</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="order.name"
                  label="Tên hàng"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="order.weight"
                  label="Khối lượng"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="order.type"
                  :items="['Đồ điện tử', 'Tài liệu', 'Thực phẩm']"
                  label="Loại hàng"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="submit" color="primary">Thêm đơn hàng</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      sender: {
        name: "",
        address: "",
        phone: "",
      },
      receiver: {
        name: "",
        address: "",
        phone: "",
      },
      order: {
        weight: "",
        name: "",
        type: "",
      },
      collection_sender: {
        name: "",
        address: "",
        phone: "",
      },
      collection_receiver: {
        name: "",
        address: "",
        phone: "",
      },
      collection_order: {
        weight: "",
        name: "",
        type: "",
      },
    };
  },

  methods: {
    submit() {
      // Có thể thêm logic xử lý khác nếu cần
    },
  },
};
</script>
<style scoped></style>
