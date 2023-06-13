<script>
    import { onMount } from "svelte";

    import { format_time } from "../format";

    import Switch from "../components/switch.svelte";
    import Slider from "../components/slider.svelte";
    import Video from "../components/video.svelte";
    let switch_value;
    let slider_value;
    let video;
    let currentTime = 0;
    let readyState;
    let duration;
    let advance_ready;
    let frame;
    let start_frame = 0;
    let end_frame = 0;

    async function slider_time() {
        // if (!video) return;
        await video.set_video_time(slider_value);
    }
    $: slider_value = frame;
    onMount(async () => {
        // let frame = 0;
        if (readyState < 3) return;
    });

    async function keyHandler(e) {
        if (e.keyCode == 37) {
            e.preventDefault();
            await video.frame_advance(e.shiftKey ? -15 : -1);
        }
        if (e.keyCode == 39) {
            e.preventDefault();
            await video.frame_advance(e.shiftKey ? 15 : 1);
        }
    }
</script>

<svelte:window on:keydown={keyHandler} />
<Switch id="timing_method" bind:switch_value />

<!-- <div>readyState: {video.readyState}</div> -->
<div>currentTime: {format_time(frame)}</div>
<!-- <div>duration: {video ? video.duration : undefined}</div> -->
<div>can advance?: {advance_ready}</div>
<!-- svelte-ignore a11y-media-has-caption -->
<Video
    bind:this={video}
    bind:currentTime
    bind:duration
    bind:readyState
    bind:advance_ready
    bind:frame
/>
<Slider
    from={0}
    to={Math.floor(duration * 30)}
    bind:slider_value
    fn={slider_time}
/>
<br /><button on:click={() => (start_frame = frame)}>Set Start</button>
<button on:click={() => (end_frame = frame)}>Set End</button>
<span>
    {format_time((end_frame - start_frame + +(switch_value == "frame")))}
</span>
<!--
    Math.floor(video.duration * 30)
-->
