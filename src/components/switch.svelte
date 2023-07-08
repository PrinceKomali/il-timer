<script>
    export let id;
    let switch_value_raw = false;
    export let switch_value;
    export let values;
    export let label;
    export let disp_values;
    $: switch_value = switch_value_raw ? values[0] : values[1];
</script>

<div class="switch" {id}>
    <p>{label}{": "}</p>
    <label for="{id}_input">
        <div>
            <div class="slider" data-checked={switch_value_raw} />
            <span class="switch_display">{switch_value_raw ? disp_values[0] : disp_values[1]}</span>
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