<script>
    import { onMount } from "svelte";

    import { format_time } from "../format";

    import File from "../components/file_input.svelte";

    import Switch from "../components/switch.svelte";
    import Slider from "../components/slider.svelte";
    import Video from "../components/video.svelte";
    let switch_value;
    let slider_value;
    let video;
    let currentTime = 0;
    let readyState;
    let duration = 0;
    let advance_ready;
    let frame;
    let start_frame = 0;
    let end_frame = 0;
    let text_value;
    let submit_video;
    let switch_value_display;

    let show_nerd_stuff = false;

    function reset_start_end() {
        start_frame = 0;
        end_frame = 0;
    }
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
        if (text_value.trim().length > 0) {
            if (e.keyCode == 13) submit_video();
            else return;
        }
        if (e.keyCode == 37) {
            e.preventDefault();
            await video.frame_advance(e.shiftKey ? -15 : -1);
        } else if (e.keyCode == 39) {
            e.preventDefault();
            await video.frame_advance(e.shiftKey ? 15 : 1);
        }
    }
</script>

<svelte:body on:keydown={keyHandler} />
<File {video} reset={reset_start_end} bind:text_value bind:submit_video />

<div class="controls">
    <Switch
        id="timing_method"
        bind:switch_value
        label="Timing Method"
        values={["delta", "frame"]}
        disp_values={["Delta Time", "Frame Count"]}
    />
    <Switch
        id="frames_or_seconds"
        bind:switch_value={switch_value_display}
        label="Display Method"
        values={["frame", "ms"]}
        disp_values={["Frames", "Seconds"]}
    />
    <button
        on:click={() => (show_nerd_stuff = !show_nerd_stuff)}
    >
        Nerd Stuff
    </button>
</div>

{#if show_nerd_stuff}
    <code>
        <div>can advance?: {advance_ready}</div>
        <div>readyState: {readyState}</div>
        <div>duration: {duration}</div>
        <div>currentTime: {currentTime}</div>
        <div>frame: {frame}</div>
    </code>
{/if}
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
    {start_frame}
    {end_frame}
/>
<div class="float-right">
    {format_time(frame, duration, switch_value_display)}
</div>
<button on:click={() => (start_frame = frame)}>Set Start</button>
<button on:click={() => (end_frame = frame)}>Set End</button>
<div>
    {format_time(
        end_frame - start_frame + +(switch_value == "frame"),
        duration,
        switch_value_display
    )}
</div>
<style lang="scss" global>
    @import "styles/global.scss";
</style>