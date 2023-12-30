<template>
  <v-card style="background-color: cornsilk">
    <v-card-title>Thông tin đơn hàng</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6" style="display: flex">
          <v-icon id="icon" size="20" class="me-2">
            <i class="fas fa-address-card"></i>
          </v-icon>
          <p style="font-weight: bold">ID:</p>
          <p>{{ idOder }}</p>
        </v-col>
        <v-col cols="6" style="display: flex">
          <v-icon id="icon" size="20" class="me-2">
            <i class="far fa-calendar-alt"></i>
          </v-icon>
          <p style="font-weight: bold">Cập nhật lúc:</p>
          <p>{{ date }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" style="display: flex">
          <v-icon id="icon" size="20" class="me-2">
            <i class="fas fa-business-time"></i>
          </v-icon>
          <p style="font-weight: bold">Trạng thái:</p>
          <p>Đơn hàng đang ở điểm tập kết Cầu Giấy</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card style="background-color: cornsilk">
            <v-card-title>Thông tin người gửi</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" style="display: flex">
                  <v-icon id="icon" size="20" class="me-2">
                    <i class="fas fa-address-book"></i>
                  </v-icon>
                  <p style="font-weight: bold">Họ tên:</p>
                  <p>{{ sender.name }}</p>
                </v-col>
                <v-col cols="12" style="display: flex">
                  <v-icon id="icon" size="20" class="me-2">
                    <i class="fas fa-phone-square"></i>
                  </v-icon>
                  <p style="font-weight: bold">Số điện thoại:</p>
                  <p>{{ sender.phone }}</p>
                </v-col>
                <v-col cols="12" style="display: flex">
                  <v-icon id="icon" size="20" class="me-2">
                    <i class="fas fa-building"></i>
                  </v-icon>
                  <p style="font-weight: bold">Địa chỉ:</p>
                  <p>{{ sender.address }}</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card style="background-color: cornsilk">
            <v-card-title>Thông tin người nhận</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" style="display: flex">
                  <v-icon id="icon" size="20" class="me-2">
                    <i class="far fa-address-book"></i>
                  </v-icon>
                  <p style="font-weight: bold">Họ tên:</p>
                  <p>{{ receiver.name }}</p>
                </v-col>
                <v-col cols="12" style="display: flex">
                  <v-icon id="icon" size="20" class="me-2">
                    <i class="fas fa-phone"></i>
                  </v-icon>
                  <p style="font-weight: bold">Số điện thoại:</p>
                  <p>{{ receiver.phone }}</p>
                </v-col>
                <v-col cols="12" style="display: flex">
                  <v-icon id="icon" size="20" class="me-2">
                    <i class="far fa-building"></i>
                  </v-icon>
                  <p style="font-weight: bold">Địa chỉ:</p>
                  <p>{{ receiver.address }}</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { CustomerService } from "../../service/CustomerService";
export default {
  props: {
    idOder: String,
  },
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
      date: "",
    };
  },
  created() {
    this.initialize();
  },
  // watch: {
  //   idOder(newVal, oldVal) {
  //     if (newVal !== oldVal) {
  //       this.initialize();
  //     }
  //   },
  // },
  methods: {
    async initialize() {
      try {
        const res = await CustomerService.searchShipment(this.idOder);
        if (res.error_code === 0) {
          console.log(res.data);
          this.sender.name = res.data.address.sender_username;
          this.sender.address = res.data.address.sender_address;
          this.sender.phone = res.data.address.sender_phone;
          this.receiver.name = res.data.address.sender_username;
          this.receiver.address = res.data.address.sender_address;
          this.receiver.phone = res.data.address.sender_phone;
          this.order.weight = res.data.shipment.goods_weight;
          this.order.name = res.data.shipment.name;
          this.order.type = res.data.shipment.goods_type;
          this.date = res.data.shipment.updated_at;

          //gán thêm data vào đây
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
