<script>
    export let id;
    let switch_value_raw = false;
    export let switch_value;
    $: switch_value = switch_value_raw ? "delta" : "frame";
</script>

<div class="switch" {id}>
    Timing Method: <label for="{id}_input" class="switch_label">
        <input
            bind:checked={switch_value_raw}
            id="{id}_input"
            type="checkbox"
            class="switch_input"
        />
        <span class="switch_display">{switch_value_raw ? "Delta Time" : "Frame Count"}</span>
    </label>
</div>

<style lang="scss">
    @import "../../styles/switch.scss";
</style>
