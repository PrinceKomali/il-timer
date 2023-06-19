<script>
    export let id;
    let switch_value_raw = false;
    export let switch_value;
    $: switch_value = switch_value_raw ? "delta" : "frame";
</script>

<div class="switch" {id}>
    Timing Method: 
    <label for="{id}_input">
        <div>
            <div class="slider" data-checked={switch_value_raw} />
            <span class="switch_display">{switch_value_raw ? "Delta Time" : "Frame Count"}</span>
        </div>
        <input
            bind:checked={switch_value_raw}
            id="{id}_input"
            type="checkbox"
        />
    </label>
</div>

<style lang="scss">
    @use "../../styles/switch.scss";
</style>