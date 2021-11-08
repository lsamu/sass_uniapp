<template>
    <div class="vue-pan-zoom-item" :class="['vue-pan-zoom-item-' + instanceId]">
        <div class="vue-pan-zoom-scene">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, toRefs } from '@vue/composition-api'
import panZoom from 'panzoom'

export default defineComponent({
    props: ["options", "selector"],
    setup(props, context) {
        const root = getCurrentInstance();
        const that = root.proxy;
        const thatData = reactive({
            $panZoomInstanceId: null,
            $panZoomInstance: null,
            instanceId: null,
            defaultOptions: {
                autocenter: true,
                bounds: true,
                transformOrigin: {
                    x: 0.5,
                    y: 0.5,
                },
                beforeMouseDown: function (e) {
                    // allow mouse-down panning only if altKey is down. Otherwise - ignore
                    var shouldIgnore = !e.altKey;
                    return shouldIgnore;
                }
            }
        });

        const scene = computed(() => {
            let el;
            let _wrapper = that.$el.querySelector('.vue-pan-zoom-scene');
            if (props.selector) {
                el = _wrapper.querySelector(props.selector);
            }
            else {
                el = _wrapper.querySelector('svg, object, embed');
                if (!el) {
                    el = _wrapper.firstChild;
                }
            }
            return el;
        });

        onMounted(() => {
            if (scene.value) {
                var _options = Object.assign({}, thatData.defaultOptions, props.options);
                thatData.$panZoomInstance = panZoom(scene.value, _options);
                thatData.$panZoomInstanceId = thatData.instanceId;
                attachEvents();
            }
        })


        const generateRandomId = function (l) {
            l = l || 16;
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var charsLength = chars.length;
            var a = [];

            for (var i = 0; i < l; i++) {
                a.push(chars.charAt(Math.floor(Math.random() * charsLength)));
            }
            return a.join('');
        }

        const attachEvents = function () {
            context.emit('init', thatData.$panZoomInstance, thatData.$panZoomInstanceId);

            thatData.$panZoomInstance.on('panstart', (e) => {
                context.emit('panstart', e);
            });

            thatData.$panZoomInstance.on('panend', (e) => {
                context.emit('panend', e);
            });

            thatData.$panZoomInstance.on('pan', (e) => {
                context.emit('pan', e);
            });

            thatData.$panZoomInstance.on('zoom', (e) => {
                context.emit('zoom', e);
            });

            thatData.$panZoomInstance.on('transform', (e) => {
                context.emit('transform', e);
            });

            thatData.$panZoomInstance.on('zoomend', (e) => {
                context.emit('zoomend', e);
            });
        }

        const isPaused = function () {
            return thatData.$panZoomInstance.isPaused();
        }

        const pause = function () {
            thatData.$panZoomInstance.pause();
        }

        const resume = function () {
            thatData.$panZoomInstance.resume();
        }

        return {
            ...toRefs(thatData),
            isPaused,
            pause,
            resume
        }
    },
})
</script>
