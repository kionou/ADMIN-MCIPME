<template>
  <div class="row">
    <div class="card col-xl-5 col-lg-5 col-md-5 py-2">
      <div class="bg-white rounded-lg">
        <div class="overflow-hidden bg-white border-b border-gray-200 rounded-lg">
          <div class="border-t border-gray-200">
            <dl>
              <div class="px-4 py-3 bg-gray-50 sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Région</dt>
                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="data.region">
                  {{ data.region.NomRegion }}
                </dd>
              </div>
              <div class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Préfecture</dt>
                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="data.region">
                  {{ data.Sousprefecture }}
                </dd>
              </div>
              <div class="px-4 py-3 bg-gray-50 sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Commune</dt>
                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="data.commune">
                  {{ data.commune.NomSousPrefecture }}
                </dd>
              </div>
              <div class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Ville</dt>
                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ data.Ville || 'Néant' }}
                </dd>
              </div>
              <div class="px-4 py-3 bg-gray-50 sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Quartier</dt>
                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="data.quartier">
                  {{ data.quartier.NomQuartier }}
                </dd>
              </div>
              <div class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Rue</dt>
                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.Rue }}</dd>
              </div>
              <div class="px-4 py-3 bg-gray-50 sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Boite Postale</dt>
                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ data.BoitePostale }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
    
    <!-- La carte est toujours affichée, mais le marqueur est conditionnel -->
    <div class="col-xl-7 col-lg-7 col-md-7">
      <div class="maps_container">
        <l-map ref="map" v-model:zoom="zoom" :center="mapCenter">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          
          <!-- Affichage du marqueur uniquement si les coordonnées sont valides -->
          <l-marker v-if="hasValidCoordinates" :lat-lng="mapCenter" @click="handleMarkerClick">
            <l-popup>
              <div>
                <h3>{{ data.SigleMpme }}</h3>
                <p>Région: {{ data.region?.NomRegion }}</p>
                <p>Tél: {{ data.NumeroWhatsApp }}</p>
              </div>
            </l-popup>
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

export default {
  name: 'Position',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      zoom: 7
    };
  },
  computed: {
    hasValidCoordinates() {
      return this.data?.LatitudeMpme && this.data?.LongitudeMpme;
    },
    mapCenter() {
      return [
        this.data.LatitudeMpme ?? '',
        this.data.LongitudeMpme ?? ''  
      ];
    }
  },
  methods: {
    handleMarkerClick() {
      if (this.$refs.map) {
        this.$refs.map.leafletObject.flyTo(this.mapCenter, 14, {
          duration: 1
        });
      }
    }
  }
};
</script>

<style scoped>
.maps_container {
  width: 100%;
  height: 450px;
  padding: 10px;
}

:deep(.leaflet-container) {
  width: 100%;
  height: 100%;
}
</style>
