<script>
    export let to;
    export let from;
    export let id;
    export let slider_value;
    export let fn;
    export let start_frame;
    export let end_frame;
    export let click_start;
    export let click_end;
</script>

<input
    type="range"
    min={from}
    max={to}
    bind:value={slider_value}
    on:change={fn}
/>
<div class="markers">
    <div
        on:click={click_start}
        style="--start_frame:{start_frame}; --duration:{to}"
        class="start_frame"
    >
        <img alt="" src="/end.png" />
    </div>
    <div
        on:click={click_end}
        style="--end_frame:{end_frame}; --duration:{to}"
        class="end_frame"
    >
        <img alt="" src="/end.png" />
    </div>
</div>

<style lang="scss">
    @use "../../styles/slider.scss";
</style>
