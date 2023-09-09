onchange = e => {
    let reader = new FileReader();
    let name = e.target.files[0].name
    let date = e.target.files[0].lastModified
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        // 3. 리스트에 저장합니다.
        async function imageHandle(e){
          images = [...images, {
          image : base64.toString(),
          name,
          date
        }
        ];
      }
    }
    
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
    }
    document.getElementById("imageCamera").value = null
  }
}

function check(){
  window.location.href="./setting.html";
}

// onChange={e => {
//     let reader = new FileReader();
//     let name = e.target.files[0].name
//     let date = e.target.files[0].lastModified
//     reader.onloadend = () => {
//       // 2. 읽기가 완료되면 아래코드가 실행됩니다.
//       const base64 = reader.result;
//       if (base64) {
//         // 3. 리스트에 저장합니다.
//         setImages(images => [...images, {
//           image: base64.toString(),
//           name,
//           date
//         }])
//       }
//     }

//     if (e.target.files[0]) {
//       reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
//     }
//     document.getElementById("imageCamera").value = null
//   }}
