create_map(); //첫 화면 출력시 호출

//지도 만드는 함수
function create_map( //인수 없을 시 기본 좌표
  a = "37.4561636344619",
  b = "126.71133809339524",
  c = "우리집"
) {
  // 카카오 지도 API 시작
  var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
  var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(a, b), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };
  var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  // 카카오 지도 API 끝

  var marker = new kakao.maps.Marker({
    // 지도 중심좌표에 마커를 생성합니다
    position: map.getCenter(),
  });

  // 인포윈도우로 장소에 대한 설명을 표시합니다
  var infowindow = new kakao.maps.InfoWindow({
    content: `<div style="width:150px;text-align:center;padding:6px 0;">${c}</div>`,
  });
  infowindow.open(map, marker);

  // 지도에 마커를 표시합니다
  marker.setMap(map);

  // 지도 상단에 장소명 변경 이벤트
  $("#map_name").html(c);
}
