import axios from "axios";

class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
      validateStatus: () => true,
    });
  }

  changeUserName = (profile) => {
    return this.service.post("/api/profile/changeusername", { profile }).then((response) => response.data);
  };

  changePassword = (profile) => {
    return this.service.post("/api/profile/changePassword", { profile }).then((response) => response.data);
  };

  savePattern = (name, data) => {
    return this.service
      .post("/api/profile/savepattern", { name, data })
      .then((response) => response.data)
      .catch((error) => error);
  };

  loadPattern = (patternName) => {
    return this.service.get("/api/profile/loadpattern", { patternName }).then((response) => response.data);
  };

  deletePattern = (patternName) => {
    return this.service.post("/api/profile/delpattern", { patternName }).then((response) => response.data);
  };
}

export default UserService;
