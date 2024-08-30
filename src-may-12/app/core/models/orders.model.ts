export interface Orders {
    "order_number"?:string,
    "order_id": number,
    "user_id": number,
    "address": string,
    "grand_total": number,
    "client_name": string,
    "client_email": string,
    "ordered_placed_date": Date,
    "consultant_name": string,
    "order_status": string,
    "order_status_": number|null,
    "order_log_time": Date
}

// export class UserModel {
//   uuid?: string;
//   name?: string;
//   created_by?: string;
//   created_by_name?: string;
//   gender?: number;
//   status?: number;
//   created_at?: Date;
//   updated_at?: Date;
//   updated_by?: string;
//   updated_by_name?: string;
//   deleted_at?: Date;
//   deleted_by?: Date;
//   deleted_by_name?: string;
//   email?: string;
//   phone?: string;

//   constructor(user: Partial<User>) {
//     if (user) {
//       this.uuid = user.uuid;
//       this.name = user.name;
//       this.created_at = user.created_at;
//       this.created_by_name = user.created_by_name;
//       this.gender = user.gender;
//       this.status = user.status;
//       this.created_at = user.created_at;
//       this.updated_at = user.updated_at;
//       this.updated_by = user.updated_by;
//       this.updated_by_name = user.updated_by_name;
//       this.deleted_at = user.deleted_at;
//       this.deleted_by = user.deleted_by;
//       this.deleted_by_name = user.deleted_by_name;
//       this.email = user.email;
//       this.phone = user.phone;
//     }
//   }
// }
