class authModel {
  static getAuth(data) {
    const { email, password } = data;
    if (email !== "admin@admin.com" || password !== "admin") {
      throw new Error("notAuth");
    }
    return
  }
};

module.exports = authModel;
