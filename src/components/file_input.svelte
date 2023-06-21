<script>
    export let video;
    export let reset; 
    export let text_value = "";
    export function submit_video() {
        return text_value.trim().length < 1 ? load_blob() : load_url();
    }
    function load_url() {
        video.video_element.src = 'https://api.komali.dev/dl?url=' + encodeURIComponent(text_value);
        video.loaded = true;
        video.set_video_time(0);
        text_value = "";
        reset();
    }
    function load_blob() {
        if (this.files && this.files[0]) {
            video.video_element.src = URL.createObjectURL(this.files[0]);
            video.loaded = true;
            video.set_video_time(0);
            text_value = "";
            reset();
        }
    }
    // TODO: check for validity
</script>

{#if text_value.trim().length < 1}
    <button style="width: 6em">
        <label class="input_label" for="file_input">Load File</label>
    </button>
{:else}
    <button style="width: 6em" on:click={load_url}>Load URL</button>
{/if}
<input
    class="url_input"
    type="text"
    data-empty={text_value.trim().length < 1}
    bind:value={text_value}
    placeholder="https://..."
/>
<input id="file_input" type="file" on:change={load_blob} />

<style lang="scss">
    @use "../../styles/file_input.scss";
</style>
