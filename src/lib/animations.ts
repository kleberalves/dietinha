export const startAnimation = (startValue: number, endValue: number, onFrame: (value: number) => void, onEnd?: Function) => {

    let start = Date.now();
    let now = 0;
    let duration = 1000;

    const goAnime = () => {
        now = Date.now();
        if (now - start >= duration) {
            if (onEnd) {
                onEnd();
            }
            return;
        };

        onFrame(startValue + (endValue - startValue) * inOutCube((now - start) / duration))

        frameAnime(goAnime);
    }
    //Substituto do requestAnimationFrame
    //https://stackoverflow.com/questions/37268250/adding-easing-on-requestanimationframe
    //https://cssanimation.rocks/scroll-animations/
    const frameAnime = (callback: Function) => {
        setTimeout(callback, 1000 / 60);
    }

    //ease functions
    //https://github.com/component/ease/blob/master/index.js

    const outQuint = (n) => {
        return --n * n * n * n * n + 1;
    }
    const inCube = (n) => {
        return n * n * n;
    };

    const outCube = (n) => {
        return --n * n * n + 1;
    };

    const outQuad = (n) => {
        return n * (2 - n);
    };

    const inOutQuad = (n) => {
        n *= 2;
        if (n < 1) return 0.5 * n * n;
        return - 0.5 * (--n * (n - 2) - 1);
    };

    const inBack = (n) => {
        var s = 1.70158;
        return n * n * ((s + 1) * n - s);
    };

    const inOutCube = (n) => {
        n *= 2;
        if (n < 1) return 0.5 * n * n * n;
        return 0.5 * ((n -= 2) * n * n + 2);
    };


    goAnime();

}