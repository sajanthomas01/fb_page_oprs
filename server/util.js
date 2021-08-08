export function fbErrorMessageMaker(code) {
  switch (code) {
    case 100:
      return "Invalid Parameter";

    case 110:
      return "Invalid user id";

    case 200:
      return "Permission error";

    case 190:
      return "Invalid Access token/ token expired";

    case 3:
      return "Application does not have the capability to make this API call, in our case need app review for page_meta permission";

    default:
      return "Error occurred"
  }
}