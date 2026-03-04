export function getCloudinaryImage(url:string, width:number) {
  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,c_limit,w_${width}/`
  );
}

//optimize image from cloudinary 