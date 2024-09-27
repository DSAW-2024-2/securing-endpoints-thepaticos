class authModel {
  static isValidResBody(resBody) {
    return (
      typeof resBody === 'object' &&
      resBody !== null &&
      'email' in resBody &&
      'password' in resBody
    );
  }

  static getAuth(credentials) {
    if (!this.isValidResBody(credentials)) { 
      throw new Error("Invalid body format");
    }
    const { email, password } = credentials;
    if (email !== "admin@admin.com" || password !== "admin") {
      throw new Error("Invalid email or password");
    }
    return true;
  }
}

module.exports = authModel;