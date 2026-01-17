
const PLACEHOLDER_IMG = "https://res.cloudinary.com/dq0ltmja4/image/upload/f_auto,q_auto,c_limit,jake-gard-CetB-bTDBtY-unsplash_c8vtsd.jpg";

export const getOptimizedImg = (url, width = null, height = null) => {

    if (!url) return PLACEHOLDER_IMG;


    if (!url.includes("res.cloudinary.com")) {
        return url;
    }

    const params = ["f_auto", "q_auto", "c_limit"];

    if (width) params.push(`w_${width}`);
    if (height) params.push(`h_${height}`);


    const transformationString = params.join(",");

    return url.replace("/upload/", `/upload/${transformationString}/`);
};