<svelte:options accessors />

<script>
    export let video_element = { src: "" };
    export let currentTime = 0;
    export let duration;
    export let readyState;
    export let frame = 0;
    export let loaded = false;
    export let advance_ready;
    advance_ready = true;
    let overlay = { style: {} }; // if it aint broke dont fix it

    export async function set_video_time(n) {
        if (!advance_ready) return;
        if (n == frame) return;
        if (n < 0) n = 0;
        if (n / 30 > duration) n = Math.floor(duration * 30);
        if(!video_element) return;
        frame = n;
        video_element.currentTime = frame / 30;

        advance_ready = false;
        let int_n = -1;
        await new Promise((r) => {
            video_element.onseeked = r;
            if(video_element.readyState < 3) int_n = setInterval(() => {
                if(video_element.readyState > 2) r(); // I hate this but it works 
            }, 1000)
        });
        if(int_n != -1) clearInterval(int_n);
        advance_ready = true;
    }
    export async function frame_advance(n) {
        return await set_video_time(frame + n);
    }
</script>

<div class="video_container">
    <div
        class="overlay {!advance_ready || readyState < 3 ? 'reveal' : ''}"
        bind:this={overlay}
    >
        <img src="load.gif" alt="" class="loading" />
    </div>
    <div class="no_video {loaded ? "hidden" : ""}">
        <img src="favicon.png" alt="" class="no_video_icon" />
    </div>
    <video
        controls={false}
        bind:this={video_element}
        bind:currentTime
        bind:readyState
        bind:duration
        src=""
        muted
    />
</div>

<style lang="scss">
    @use "../../styles/video.scss";
</style>
