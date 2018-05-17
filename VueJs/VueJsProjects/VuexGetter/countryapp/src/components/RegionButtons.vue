<template>
    <div>
        <button class="region" 
        v-for="r in regions" 
        v-bind:class="isSelected(r)"
        @click="changeRegion({ region: r })">
        {{ r }}
        </button>
    </div>
</template>

<script>
    import Constant from '../Constant.js';
    import _ from 'underscore';
    import { mapGetters, mapMutations } from 'vuex'

    export default {
        name: "RegionButtons",
        computed: mapGetters([
            'regions', 'currentRegion'
        ]),
        methods: _.extend(
            {
                isSelected(region) {
                    if (region == this.currentRegion) return { selected: true };
                    else return { selected: false }
                }
            },
            mapMutations([
                Constant.CHANGE_REGION
            ])
        )
    }
</script>

<style>
    button.region { text-align:center;width:80px;margin:2px;border:1px solid gray; }
    button.selected { background-color:purple;color:aqua }
</style>