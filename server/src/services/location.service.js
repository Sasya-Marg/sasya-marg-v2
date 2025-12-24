import axios from 'axios'
import { ApiError } from "../utils/apiError.js";

const APP_NAME = "sasya-marg/v-2.0.0";
const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";

export const resolveLocation = async (location) => {
    try {
        let lat, lon;

        /** -----------------------------
         * CASE 1: Coordinates provided
         * ----------------------------- */
        if (location.coordinates?.lat && location.coordinates?.lon) {
            lat = location.coordinates.lat;
            lon = location.coordinates.lon;
        }

        /** -----------------------------
         * CASE 2: Manual input provided
         * ----------------------------- */
        else if (location.locality && location.state && location.country && location.district) {
            const query = `${location.district}, ${location.state}, ${location.country}`;

            const forwardRes = await axios.get(`${NOMINATIM_BASE}/search`, {
                params: {
                    q: query,
                    format: "jsonv2",
                    limit: 1
                },
                headers: { "User-Agent": APP_NAME }
            });

            if (!forwardRes.data.length) {
                throw new ApiError(404, "Unable to resolve address");
            }

            lat = Number(forwardRes.data[0].lat);
            lon = Number(forwardRes.data[0].lon);
        }

        else {
            throw new ApiError(
                400,
                "Provide either coordinates or locality, state, and country"
            );
        }

        /** -----------------------------
         * REVERSE GEOCODING (NORMALIZE)
         * ----------------------------- */
        const reverseRes = await axios.get(`${NOMINATIM_BASE}/reverse`, {
            params: {
                lat,
                lon,
                format: "jsonv2"
            },
            headers: { "User-Agent": APP_NAME }
        });

        const addr = reverseRes.data.address || {};

        const locality =
            addr.village ||
            addr.town ||
            addr.city ||
            addr.hamlet ||
            addr.suburb ||
            "";

        const district =
            addr.state_district ||
            addr.county ||
            "";

        const state = addr.state || "";
        const country = addr.country || "";

        if (!locality || !state || !country) {
            throw new ApiError(400, "Incomplete location data received");
        }

        return {
            locality: locality.trim(),
            district: district.trim(),
            state: state.trim(),
            country: country.trim(),
            coordinates: {
                lat,
                lon
            }
        };

    } catch (error) {
        console.log("error from location service ::", error)
        if (error instanceof ApiError) throw error;

        throw new ApiError(
            500,
            `Location resolution failed: ${error.message}`
        );
    }
};
