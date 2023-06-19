<script>
    export let to;
    export let from;
    export let id;
    export let slider_value;
    export let fn;
    export let start_frame;
    export let end_frame;
</script>
<style lang="scss">
    @use "../../styles/slider.scss";
</style>
<input type="range" min={from} max={to} bind:value={slider_value} on:change={fn}/>
<div style="--start_frame:{start_frame}" class="start_frame"></div>