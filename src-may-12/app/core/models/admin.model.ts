export interface Admin {
  uuid?: string;
  first_name?: string;
  last_name?: string;
  role?: number;
  email?: string;
}

export class AdminModel {
  uuid?: string;
  first_name?: string;
  last_name?: string;
  role?: number;
  email?: string;
  image?:string;

  constructor(admin: Partial<Admin>) {
    if (admin) {
      this.uuid = admin.uuid;
      this.first_name = admin.first_name;
      this.last_name = admin.last_name;
      this.role = admin.role;
      this.email = admin.email;
      this.image =  'assets/img/icons/common/admin-default.png';
    }
  }

  // getAdminGender = () => {
  //   const gender = this.gender;
  //   switch (gender) {
  //     case 1:
  //       return "Male";
  //     case 2:
  //       return "Female";
  //     case 3:
  //       return "Other";
  //   }
  // };

  getAdminRole = () => {
    switch (this.role) {
      case 1:
        return "Admin";
      case 2:
        return "Consultant";
      case 3:
        return "Employee";
      case 4:
        return "Manager";
      case 5:
        return "Customer support";
    }
  };
}
