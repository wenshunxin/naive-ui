import { Map, View } from "ol";
import * as olProj from "ol/proj";
import WKT from "ol/format/WKT";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer"; //图层
import { XYZ, Vector as VectorSource, TileImage } from "ol/source"; //图层源

import { Select, Modify } from "ol/interaction";
import ModifyTouch from "ol-ext/interaction/ModifyTouch";
import Bar from "ol-ext/control/Bar";
import Toggle from "ol-ext/control/Toggle";
import TextButton from "ol-ext/control/TextButton";

import { getFarmInfo } from "@/api/map";

let map = null;

export function handleInitMap() {
  return new Promise(resolve =>{
    map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
          }),
        }),
      ],
      view: new View({
        center: olProj.fromLonLat([116.56644969465627, 39.90459983612061]),
        zoom: 17,
        maxZoom: 19,
      }),
      controls: [],
    });
    handleGetFarmInfo();
    resolve(map)
  })
}

async function handleGetFarmInfo() {
  let data = await getFarmInfo(71);
  if (data.rtState) {
    let wkt = data.rtData.geom;
    let feature = new WKT().readFeature(wkt, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });
    let vector = new VectorLayer({
      source: new VectorSource({
        features: [feature],
      }),
    });
    map.addLayer(vector);

    let select = new Select({
      layers: [vector],
      hitTolerance: 5,
    });
    map.addInteraction(select);

    // Interaction
    var modify = new ModifyTouch({
      title: "删除点",
      features: select.getFeatures(),
    });
    map.addInteraction(modify);

    var bar = new Bar();
    map.addControl(bar);
    var removeBt = new Toggle({
      onToggle: function (b) {
        removeBt.setActive(false);
      },
      bar: new Bar({
        controls: [
          new TextButton({
            handleClick: function (b) {
              modify.removePoint();
            },
          }),
        ],
      }),
    });
    bar.addControl(removeBt);

    modify.on("showpopup", function (e) {
      if (!modify.get("usePopup")) removeBt.setActive(true);
    });
    modify.on("hidepopup", function (e) {
      removeBt.setActive(false);
    });
  }
}
