<script>
    export let to;
    export let from;
    export let id;
    export let slider_value;
    export let fn;
</script>
<style lang="scss">
    @import "../../styles/slider.scss";
</style>
<input type="range" min={from} max={to} bind:value={slider_value} on:change={fn}/>