/*
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import "./style.css";

let map: google.maps.Map;
let marker: google.maps.Marker;
let geocoder: google.maps.Geocoder;
let responseDiv: HTMLDivElement;
let response: HTMLPreElement;

function initMap(): void {
  const myLatLng = { lat: 10.787411833842594, lng:  106.71614209174808 };
  const univer = { lat: 10.76160599528014, lng: 106.68220885530904 };
  const univer1 = { lat: 10.7617550532, lng: 106.682484 };
  const univer2 = { lat: 10.76180132, lng: 106.682693 };
  const univerCs2 = { lat: 10.786788773983961, lng: 106.68065626880352 };
  const univerKtx = { lat: 10.771835126593642, lng: 106.64442439762756 };

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 10,
      center: myLatLng,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
    }
  );

const arr = [
  {
    position: myLatLng,
    contentString: '<div id="title">Sân golf Him Lam</div>'+'<p id="content">234 Đường Ngô Tất Tố, Phường 22, Bình Thạnh, Thành phố Hồ Chí Minh</p>',
  },
  {
    position: univer,
    contentString: '<div id="title">Chiến dịch mùa hè xanh</div>'+'<p id="content">280 Đ. An Dương Vương, Phường 4, Quận 5, Thành phố Hồ Chí Minh</p>',
  },
  {
    position: univer1,
    contentString: '<div id="title">Chiến dịch hiến máu nhân đạo</div>'+'<p id="content">280 Đ. An Dương Vương, Phường 4, Quận 5, Thành phố Hồ Chí Minh</p>',
  },
  {
    position: univer2,
    contentString: '<div id="title">Chiến dịch hoa phượng đỏ</div>'+'<p id="content">280 Đ. An Dương Vương, Phường 4, Quận 5, Thành phố Hồ Chí Minh</p>',
  },
  {
    position: univerCs2,
    contentString: '<div id="title">Chiến dịch tình nguyện mùa hè</div>'+'<p id="content">222 Lê Văn Sỹ, Phường 14, Quận 3, Thành phố Hồ Chí Minh</p>',
  },
  {
    position: univerKtx,
    contentString: '<div id="title">Chiến dịch tiếp sức mùa thi</div>'+'<p id="content">351A Lạc Long Quân, Phường 5, Quận 11, Thành phố Hồ Chí Minh</p>',
  }
]
// const newArr = arr.map(item => item)
var t= new Array(arr.length);   
arr.forEach(item => {
  const marker = new google.maps.Marker({
    position: item.position,
    map,
    title: "Hello World!",
  });
  const infoWindow = new google.maps.InfoWindow({
    content: item.contentString,
  });
 t.push(infoWindow); 
  console.log(t)
  // console.log(infoWindow)
  
  infoWindow.close()
  marker.addListener("click", () => {
    t.forEach(item => item.close())
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: true,
    });
    console.log(marker)
  });
  
})

// console.log(item)
 
  // const infoWindowNew = new google.maps.InfoWindow({
  //   content: newArr[1].contentString,
  // });
  // const markerNew = new google.maps.Marker({
  //   position: newArr[1].position,
  //   map,
  //   title: "Hello!",
  // });
  
  
  // markerNew.addListener("click", () => {
  //   infoWindow.close()
  //   infoWindowNew.open({
  //     anchor: markerNew,
  //     map,
  //     shouldFocus: true,
  //   });
  // });

  geocoder = new google.maps.Geocoder();

  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Geocode";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");

  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";

  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const instructionsElement = document.createElement("p");

  instructionsElement.id = "instructions";

  instructionsElement.innerHTML =
    "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);

  // marker = new google.maps.Marker({
  //   map,
  // });

  map.addListener("click", (e: google.maps.MapMouseEvent) => {
    geocode({ location: e.latLng });

  });

  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );

  clearButton.addEventListener("click", () => {
    clear();
  });

  clear();
}

function clear() {
  // marker.setMap(null);
  responseDiv.style.display = "none";
}

function geocode(request: google.maps.GeocoderRequest): void {
  clear();

  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;
      // marker.setPosition(results[0].geometry.location);
      // marker.setMap(map);
      responseDiv.style.display = "block";
      response.innerText = JSON.stringify(results[0].formatted_address, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}
export { initMap };
