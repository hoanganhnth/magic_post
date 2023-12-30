<template>
  <v-app>
    <v-row>
      <v-col cols="12">
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
        </v-form>
        <br />
        <div class="pdf">
          <v-btn @click="dowloadPDF" color="primary">Tạo và xuất đơn</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { StaffService } from "../../../service/StaffService";
import jspdf from "jspdf";
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
        receiver_username: "",
        receiver_phone: "",
        receiver_address: "",
        sender_username: "",
        sender_phone: "",
        sender_address: "",
        product_type: "",
        product_name: "",
        product_weight: "",
      },
    };
  },
  methods: {
    dowloadPDF() {
      this.submit();
      const logo = require("@/assets/images/sos.png");
      this.submit();
      const doc = new jspdf();
      var imgLogo = new Image();
      imgLogo.src = logo;
      doc.addImage(imgLogo, "PNG", 0, 0, 200, 141);
      doc.save("Vận đơn.pdf");
    },
    async submit() {
      // this.id = "12344A12D";
      this.displayedInfo.receiver_username = this.receiver.name;
      this.displayedInfo.receiver_phone = this.receiver.phone;
      this.displayedInfo.receiver_address = this.receiver.address;
      this.displayedInfo.sender_address = this.sender.address;
      this.displayedInfo.sender_username = this.sender.name;
      this.displayedInfo.sender_phone = this.sender.phone;
      this.displayedInfo.product_name = this.order.name;
      this.displayedInfo.product_type = this.order.type;
      this.displayedInfo.product_weight = this.order.weight;
      try {
        const res = await StaffService.createNewShipment(this.displayedInfo);
        if (res.error_code === 0) {
          console.log(res);
          // res.data.shipment.fee  : là phí
        }
      } catch (error) {
        console.error(error);
      }
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
    print() {
      // const options = {
      //   name: "_blank",
      //   specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
      //   styles: [
      //     "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
      //     "https://unpkg.com/kidlat-css/css/kidlat.css",
      //     "https://cdn.jsdelivr.net/npm/@vuetify/core@2.4.3/dist/vuetify.min.css",
      //   ],
      // };

      // this.$htmlToPaper("bill", options);
      const content = document.querySelector("#bill");
      // In hóa đơn
      window.print(content);
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

@media print {
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
}
/* Your component styles here */
</style>
