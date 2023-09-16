
function uploadImage() {
  const input = document.getElementById('cameraInput');
  const selectedImage = input.files[0]; // 선택한 이미지 가져오기
  console.log(selectedImage);
  if (selectedImage) {
      // 이미지를 다음 페이지로 전달
      const url = 'profilePicture.html';
      const formData = new FormData();
      formData.append('image', selectedImage);

      let values = formData.values();
      for (const pair of values) {
        console.log(pair);
      }
      // POST 요청을 사용하여 이미지 데이터를 다음 페이지로 전달
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.send(formData);
      // 페이지 이동
      window.location.href = url;
  } 
  else{
      window.alert('이미지를 선택하세요.');
  }
}


function check() {
const name = document.getElementById('name').value;
const bias = document.getElementById('bias').value;
const weight = document.getElementById('weight').value;
const goal_weight = document.getElementById('goal_weight').value;

const token = localStorage.getItem("token");

// Axios를 사용하여 서버로 요청 보내기
axios
.post("http://52.78.221.233:3000/users/update-profile", {
  name: name,
  bias: bias,
  weight: weight,
  goal_weight: goal_weight,
}, {headers: { authorization: token }},)
  .then((response) => {
    console.log('프로필이 업데이트되었습니다.', response.data);
    window.location.href="./setting.html";
  })
  .catch((error) => {
    // 업데이트 중 오류 발생 시 처리
    console.error('프로필 업데이트 중 오류 발생', error);
    // 에러 처리 (예: 오류 메시지 표시)
  });
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
