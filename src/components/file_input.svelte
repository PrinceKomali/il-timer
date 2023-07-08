<script>
    export let video;
    export let reset; 
    export let text_value = "";
    export function submit_video() {
        return text_value.trim().length < 1 ? load_blob() : load_url();
    }
    async function load_url() {
        // temp fix
        let value = text_value.trim();
        video.loaded = true;
        text_value = "";
        if(!/ *https:\/\/(www\.)?youtu(\.be)|(be\.com).*/.test(value)) {
            video.loaded = false;
            return alert("Video must be a youtube link");
            
        }
        video.video_element.src = 'https://api.komali.dev/dl?url=' + encodeURIComponent(value);
        video.loaded = true;
        video.set_video_time(0);
        video.video_element.load();
        reset();
        let check = false;
        try { // this method of doing this is absolutely horrible but it works
            let content_type = [...(await fetch('https://api.komali.dev/dl?url=' + encodeURIComponent(value))).headers].find(x=>x[0] == "content-type")
            if(content_type[1].startsWith("video/")) check = true; // this should never fire but just in case it does
        }
        catch (e) { // cors error bc of redirect == success
            check = true;
        }
        if(!check) {
            video.loaded = false;
            return alert("Requested URL is invalid!")
        }
    }
    function load_blob() {
        if (this.files && this.files[0]) {
            if(!this.files[0].type.startsWith("video/")) return alert("File is not a video!");
            video.video_element.src = URL.createObjectURL(this.files[0]);
            video.loaded = true;
            video.set_video_time(0);
            text_value = "";
            video.video_element.load();
            reset();
            
        }
    }
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
