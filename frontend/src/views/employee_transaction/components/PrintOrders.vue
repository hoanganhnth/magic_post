<template>
  <v-app>
    <v-row>
      <v-col cols="6">
        <v-form ref="form">
          <v-row>
            <v-col cols="12" sm="6">
              <v-card class="no-boder">
                <v-card-title>Thông tin người gửi</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sender.name"
                        label="Họ tên"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sender.address"
                        label="Địa chỉ"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sender.phone"
                        label="Số điện thoại"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card class="no-boder">
                <v-card-title>Thông tin người nhận</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="receiver.name"
                        label="Họ tên"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="receiver.address"
                        label="Địa chỉ"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="receiver.phone"
                        label="Số điện hoại"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card class="no-boder">
                <v-card-title>Thông tin đơn hàng</v-card-title>
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
              </v-card>
            </v-col>
          </v-row>
          <v-btn @click="submit" color="primary">Xác nhận</v-btn>
        </v-form>
      </v-col>
      <v-col cols="6">
        <v-container class="ml-auto">
          <v-container class="header">
            <h3 style="font-family: Trebuchet MS; font-weight: bold">
              MAGICPOST
            </h3>
            <div>
              <v-row>
                <v-col cols="6">
                  <p style="font-style: italic">Dịch vụ chuyển phát nhanh</p>
                </v-col>
                <v-col cols="2">
                  <qr-code
                    :text="id"
                    size="50"
                    color="black"
                    bg-color="white"
                    error-level="L"
                  >
                  </qr-code>
                </v-col>
                <v-col cols="4">
                  <p>ID:{{ id }}</p>
                </v-col>
              </v-row>
            </div>
          </v-container>
          <v-row>
            <!-- Cột thứ nhất -->
            <v-col cols="12" md="6">
              <v-row class="no-gutters">
                <v-col cols="12">
                  <v-card>
                    <v-card-title>1.Người gửi</v-card-title>
                    <v-card-text
                      >Họ tên: {{ displayedInfo.senderName }}</v-card-text
                    >
                    <v-card-text
                      >Số điện thoại:
                      {{ displayedInfo.senderPhone }}</v-card-text
                    >
                    <v-card-text
                      >Địa chỉ: {{ displayedInfo.senderAddress }}</v-card-text
                    >
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card>
                    <v-card-title>3.Loại hàng gửi</v-card-title>
                    <v-card-text
                      >Tên mặt hàng: {{ displayedInfo.orderName }}</v-card-text
                    >
                    <v-card-text
                      >Loại: {{ displayedInfo.orderType }}</v-card-text
                    >
                    <v-card-text
                      >Khối lượng:
                      {{ displayedInfo.orderWeight }} (g)</v-card-text
                    >
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card id="reponsive">
                    <v-card-title>5.Cam kết</v-card-title>
                    <v-card-text
                      >Tôi chấp nhận các điều khoản và cam đoan bưu gửi không có
                      chứa những mặt hàng cấm gửi. Trường hợp không phát được,
                      tôi sẽ trả cước chuyển khoản.
                    </v-card-text>
                    <v-card-text class="content"
                      >Ngày gửi: {{ date }}</v-card-text
                    >
                    <v-card-text class="signature" style="font-weight: bold"
                      >Chữ ký người gửi</v-card-text
                    >
                  </v-card>
                </v-col>
              </v-row>
            </v-col>

            <!-- Cột thứ hai -->
            <v-col cols="12" md="6">
              <v-row class="no-gutters">
                <v-col cols="12">
                  <v-card>
                    <v-card-title>2.Người nhận</v-card-title>
                    <v-card-text
                      >Họ tên: {{ displayedInfo.receiverName }}</v-card-text
                    >
                    <v-card-text
                      >Số điện thoại:
                      {{ displayedInfo.receiverPhone }}</v-card-text
                    >
                    <v-card-text
                      >Địa chỉ: {{ displayedInfo.receiverAddress }}</v-card-text
                    >
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card>
                    <v-card-title>4.Cước phí</v-card-title>
                    <v-card-text>Cước phí chính :</v-card-text>
                    <v-card-text>Phụ phí: </v-card-text>
                    <v-card-text>Thuế (VAT 10%):</v-card-text>
                    <v-card-text>Tổng cước: </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card>
                    <v-card-title>6.Trạng thái</v-card-title>
                    <v-card-text>Đã thu của người nhận: </v-card-text>
                    <v-card-text>Còn lại: </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card>
                    <v-card-title>7.Bưu cục chấp nhận</v-card-title>
                    <v-card-text class="signature"
                      >Chữ ký của giao dịch viên
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-btn color="primary">In vận đơn</v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      id: "ID1234567",
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
      date: new Date().toISOString().substr(0, 10),
      displayedInfo: {
        receiverName: "",
        receiverPhone: "",
        receiverAddress: "",
        senderName: "",
        senderPhone: "",
        senderAddress: "",
        orderType: "",
        orderName: "",
        orderWeight: "",
      },
    };
  },
  methods: {
    submit() {
      this.id = "12344A12D";
      this.displayedInfo.receiverName = this.receiver.name;
      this.displayedInfo.receiverPhone = this.receiver.phone;
      this.displayedInfo.receiverAddress = this.receiver.address;
      this.displayedInfo.senderAddress = this.sender.address;
      this.displayedInfo.senderName = this.sender.name;
      this.displayedInfo.senderPhone = this.sender.phone;
      this.displayedInfo.orderName = this.order.name;
      this.displayedInfo.orderType = this.order.type;
      this.displayedInfo.orderWeight = this.order.weight;
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
#reponsive {
  height: 326px;
}
.no-boder {
  border: 0px !important;
}
.signature {
  height: 120px;
  border: 0px !important;
}

.content {
  padding: 20px;
}
.ml-auto {
  border: 0.5px solid #000;
  max-width: 100%;
  height: auto;
}

.no-gutters > .v-col {
  margin: 0 !important;
  padding: 0 !important;
}
.v-card-text {
  padding-left: 25px;
  padding-bottom: 5px;
  font-size: 16px;
  color: #333;
  line-height: 1;
}

.header {
  height: 120px;
  border: none !important;
  margin: 10px;
  margin-top: 0px;
}

.v-card {
  border-radius: 0px;
  border: 0.5px solid #000;
  margin: 0px !important;
}
/* Your component styles here */
</style>
