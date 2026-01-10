/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageData } from "../../redux/slices/AuthSlice";
import toast from "react-hot-toast";
import Modal from "../../components/modal/Modal";
import RestaurantCard from "../../components/RestaurantCard";
import { useNavigate } from "react-router-dom";

const DEFAULT_LOCATION = {
    lat: "26.897493702773165",
    long: "75.75630325661562",
};

const LOCATION_KEY = "USER_LOCATION";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    const [location, setLocation] = useState({
        latitude: "",
        longitude: "",
    });

    const selector = useSelector(
        (state) => state.auth
    );

    const getHomePageDataData = selector?.getHomePageDataData?.data?.data?.outlets

    const getSessionLocation = () => {
        const data = sessionStorage.getItem(LOCATION_KEY);
        return data ? JSON.parse(data) : null;
    };

    useEffect(() => {
        const savedLocation = getSessionLocation();

        if (savedLocation?.latitude && savedLocation?.longitude) {
            setLocation(savedLocation);
            setIsLocationModalOpen(false);
        } else {
            setIsLocationModalOpen(true);
        }
    }, []);



    const setSessionLocation = (lat, long) => {
        sessionStorage.setItem(
            LOCATION_KEY,
            JSON.stringify({ latitude: lat, longitude: long })
        );
    };

    useEffect(() => {
        if (location.latitude && location.longitude) {
            dispatch(
                getHomePageData({
                    lat: location.latitude,
                    long: location.longitude,
                })
            );
            setIsLocationModalOpen(false);
        }
    }, [location, dispatch]);

    const requestLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const long = pos.coords.longitude;

                setLocation({ latitude: lat, longitude: long });
                setSessionLocation(lat, long);

                toast.success("Location detected");
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    toast.error("Location permission denied. Enable it from browser settings.");
                } else {
                    toast.error("Unable to fetch location");
                }
            }
        );
    };


    const getCurrentLocation = async () => {
        if (!navigator.permissions) {
            requestLocation();
            return;
        }

        try {
            const permission = await navigator.permissions.query({
                name: "geolocation",
            });

            if (permission.state === "granted" || permission.state === "prompt") {
                requestLocation();
            } else {
                toast.error(
                    "Location access blocked. Enable it from browser settings."
                );
            }
        } catch {
            requestLocation();
        }
    };

    const useDefaultLocation = () => {
        setLocation({
            latitude: DEFAULT_LOCATION.lat,
            longitude: DEFAULT_LOCATION.long,
        });

        setSessionLocation(
            DEFAULT_LOCATION.lat,
            DEFAULT_LOCATION.long
        )
    }

    const handleOutletDetail = (name, id) => {
        const res_name = name.split(" ").join("-").toLowerCase();
        navigate(`/outlet/${res_name}/${id}`)
    }

    return (
        <>
            <div className="px-4 py-6">
                {selector?.loading && getHomePageDataData?.length === 0 && (
                    <p className="text-center text-sm text-gray-500">
                        Loading nearby restaurants...
                    </p>
                )}

                {!selector?.loading && getHomePageDataData?.length === 0 && (
                    <p className="text-center text-sm text-gray-500">
                        No restaurants found nearby
                    </p>
                )}

                <div>
                    <h1 className="text-lg font-semibold mb-4">Near by Restaurants</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {getHomePageDataData?.map((item, index) => (
                            <RestaurantCard key={index} item={item} handleClick={handleOutletDetail} />
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isLocationModalOpen}
                onClose={() => { }}
                title="Enable Location"
            >
                <div className="space-y-4 text-center">
                    <p className="text-sm text-gray-600">
                        We need your location to show nearby restaurants
                    </p>

                    <button
                        onClick={getCurrentLocation}
                        className="w-full px-4 py-2 border rounded-md text-sm"
                    >
                        📍 Use Current Location
                    </button>

                    <button
                        onClick={useDefaultLocation}
                        className="w-full px-4 py-2 text-sm text-gray-500"
                    >
                        Skip for now
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Home;
