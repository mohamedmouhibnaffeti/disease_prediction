"use client"
import { data } from "@/app/symptoms-checker/data"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { AppDispatch } from "@/Store/store"
import { useDispatch } from "react-redux"
import { fetchSymptomsByFilter } from "@/Store/Predict/PredictSlice"
import backMale from '../Images/back-m.webp'
import { useEffect } from "react"

const MaleBack = ({ setDialogOpen, setBodyPart }: {setDialogOpen: any, setBodyPart: any}) => {
    const dispatch = useDispatch<AppDispatch>()
    const fetchSymptoms = async(filter: string) => {
        const response = await dispatch(fetchSymptomsByFilter(filter))
        console.log(response.payload.Symptoms)
    }
    const handleSetDialogOpen = (part: string)  => {
        setDialogOpen(true)
        setBodyPart(part)
    }
    return (
            <svg id="full-body" x="0px" y="0px" viewBox="0 0 310 385" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">

                <image xlinkHref={backMale.src} height="100%" width="100%" x="0" y="0" className="body-bg-img"></image>

                <path onClick={()=>handleSetDialogOpen("back_head")} className="hover:fill-blue-500 cursor-pointer fill-blue-200/5"  d="M1.402 93.553c1.24 5.152 2.89 10.206 4.397 15.292 1.088 3.668 2.824 6.715 6.927 7.816.674.18 1.366 1.456 1.498 2.31l.145.955c6.68-1.078 13.39-1.989 20.125-2.665 21.155-2.124 43.093-2.13 63.916 2.658.014-.106.03-.21.045-.316.24-1.723.808-2.727 2.563-3.134 2.367-.55 3.836-2.152 4.727-4.399 3.157-7.968 6.49-15.872 6.359-24.704-.028-1.889.643-3.782.68-5.68.061-3.188-.83-4.257-3.958-4.908-1.657-.345-1.365-1.432-1.207-2.477 1.428-9.43.572-18.775-1.06-28.08-3.637-20.715-15.639-34.963-34.55-43.35C65.31-.101 57.903.104 50.636 1.4c-14.55 2.595-25.617 10.623-34.4 22.107C8.646 33.43 6.173 45.13 5.378 57.23c-.407 6.198-.071 12.446-.071 18.715C.488 77.303-.485 78.987.304 84.387c.445 3.046.383 6.195 1.098 9.166" opacity=".525" transform="scale(0.32,0.32), translate(428,0)"></path>

                <path onClick={()=>handleSetDialogOpen("neck")} className="hover:fill-blue-500 cursor-pointer fill-blue-200/5"  d="M19.597 26.974C13.603 31.746 7.34 36.08.673 39.791a384.197 384.197 0 0 0 22.81 3.9c21.242 2.959 42.896 4.15 64.278 2.08 10.42-1.01 20.857-2.841 30.917-5.831a150.887 150.887 0 0 1-4.113-2.582c-4.939-3.22-9.595-6.88-14.28-10.47-.615-.472-1.035-1.73-.923-2.537.904-6.494 1.982-12.964 2.906-19.456-27.238-6.332-56.334-4.43-83.751.013.98 6.43 1.902 12.872 2.67 19.331.1.851-.802 2.108-1.59 2.735" opacity=".525" transform="scale(0.31,0.31), translate(440,120)"></path>

                <path onClick={()=>handleSetDialogOpen("arms")} className="hover:fill-blue-500 cursor-pointer fill-blue-200/5"  d="M184.368 231.407c2.904-10.96 9.064-20.142 15.856-28.912 5.397-6.97 11.183-13.64 16.877-20.373 7.035-8.32 14.355-16.409 21.178-24.898 6.038-7.511 11.924-15.2 15.202-24.486.771-2.184 1.973-4.221 3.059-6.283.156-.297.393-.553.716-.871.118-3.69.233-7.382.352-11.072.39-12.104.827-24.21 1.601-36.296.675-10.532 1.944-20.456 5.891-30.327 6.862-17.16 18.34-31.877 27.39-47.882a107.802 107.802 0 0 1-3.904 1.877c-6.888 3.134-13.342 7.428-20.457 9.81-12.636 4.23-24.368 10.283-36.254 16.073-7.046 3.433-12.397 8.656-16.73 15.263-5.692 8.681-8.84 18.402-12.607 27.893-2.233 5.625-3.98 11.522-6.878 16.783-4.872 8.846-7.549 18.186-9.142 28.075-.57 3.532-2.651 6.996-4.66 10.09-6.78 10.441-12.232 21.538-17.153 32.933-2.422 5.608-5.434 10.793-10.056 15.007-15.31 13.958-25.664 31.326-33.648 50.179-7.365 17.387-14.047 35.068-21.615 52.363-5.027 11.49-10.868 22.644-16.764 33.725-3.109 5.842-7.147 11.188-10.707 16.795-2.362 3.72-4.734 7.442-6.896 11.28-3.534 6.276-7.739 12.037-12.797 17.144-1.064 1.075-2.631 1.68-4.017 2.404-6.34 3.305-12.697 6.575-19.046 9.862-.147.076-.308.16-.407.286-3.936 4.921-7.887 9.83-11.733 14.82-.205.268.396 1.71.782 1.786 1.987.388 4.114.98 6.028.623 3.695-.689 7.192-2.115 9.674-5.24.341-.43.845-.73 1.648-1.404-.123.753-.088 1.076-.224 1.293-5.493 8.814-10.925 17.666-16.535 26.405-3.723 5.802-7.844 11.35-11.513 17.185-2.069 3.292-3.572 6.94-5.36 10.41-.253.488-.682.884-1.029 1.323v3c5.196 1.252 8.65-1.713 11.57-5.21 4.476-5.36 8.63-10.988 12.912-16.507 3.059-3.942 6.098-7.898 9.171-11.828.273-.35.728-.557 1.57-.536-.851 2.015-1.631 4.064-2.566 6.04-3.935 8.324-6.179 17.195-8.766 25.98-1.743 5.92-3.92 11.666-3.566 17.975.11 1.956-.514 4.31 1.773 5.295 2.31.993 3.865-1.015 4.974-2.463 1.474-1.923 2.545-4.25 3.372-6.554 1.281-3.573 1.91-7.396 3.351-10.893 3.356-8.147 7.007-16.174 10.604-24.22.46-1.03 1.198-2.015 2.032-2.773.503-.457 1.442-.436 2.185-.63.001.766.224 1.614-.03 2.283-1.734 4.575-3.946 9.004-5.291 13.684-2.78 9.673-5.173 19.459-7.579 29.234-.448 1.818-1.198 4.056.935 5.467 1.237.818 5.28-.675 6.365-2.502 1.218-2.053 2.147-4.302 2.996-6.543 2.852-7.537 5.604-15.111 8.414-22.664 1.014-2.726 1.984-5.476 3.156-8.135a44.747 44.747 0 0 1 3.281-6.103c.395-.613 1.49-.777 2.265-1.146.164.733.498 1.475.465 2.2-.457 10.06-1.044 20.115-1.375 30.178-.051 1.535 1.02 3.106 1.573 4.66 1.518-1.048 3.85-1.784 4.396-3.205 1.414-3.68 2.165-7.639 2.95-11.532.986-4.887 1.741-9.82 2.596-14.732.029-.164.12-.341.085-.49-1.221-5.243 2.528-8.288 4.831-12.256 6.07-10.458 13.908-20.048 17.23-31.94 1.29-4.616 2.226-9.461 2.373-14.231.179-5.815 2.591-10.683 5.25-15.428 8.155-14.553 17.99-27.988 28.222-41.133 8.23-10.572 16.848-20.858 24.706-31.698 8.536-11.775 16.487-23.98 24.465-36.148 1.545-2.356 2.243-5.348 2.983-8.14" opacity=".525" transform="scale(0.31,0.31), translate(140,163)"></path>

                <path onClick={()=>handleSetDialogOpen("arms")} className="hover:fill-blue-500 cursor-pointer fill-blue-200/5"  d="M287.61 427.732c-3.924-6.16-7.955-12.251-11.927-18.38a2525.76 2525.76 0 0 1-10.266-15.939c-2.896-4.542-5.735-9.12-8.6-13.681l-1.292-2.057.429-.461c.733.623 1.57 1.159 2.183 1.884 2.687 3.18 6.364 4.613 10.223 5.276 2.064.354 4.324-.445 6.496-.723l.406-.833c-1.122-1.559-2.203-3.15-3.376-4.669-1.624-2.104-3.545-4.015-4.928-6.262-1.987-3.232-4.546-5.662-7.935-7.311-5.525-2.688-10.96-5.574-16.56-8.093-3.435-1.545-5.93-4.029-7.996-6.946-3.643-5.146-7.055-10.456-10.552-15.705-3.873-5.812-7.813-11.581-11.56-17.474-1.55-2.44-2.662-5.157-3.996-7.737-3.477-6.726-7.343-13.281-10.368-20.204-5.259-12.032-10.184-24.22-14.915-36.47-6.718-17.401-13.353-34.822-23.334-50.707-5.316-8.461-10.794-16.78-18.546-23.352-6.173-5.232-10.026-12.155-12.996-19.546-4.984-12.403-11.45-24.012-18.558-35.286-2.165-3.434-3.543-6.991-3.953-11.132-.967-9.797-5.35-18.396-9.783-27.043-3.357-6.55-5.918-13.537-8.477-20.46-3.977-10.759-8.32-21.325-16.713-29.463-2.986-2.894-6.711-5.203-10.439-7.118-7.248-3.727-14.712-7.04-22.137-10.412-2.796-1.271-5.659-2.521-8.62-3.28-8.13-2.088-14.98-6.765-22.218-10.64A310.24 310.24 0 0 1 .896-.014c5.684 9.06 10.505 18.633 14.468 28.581 12.353 31.01 16.33 64.15 19 97.31l.102.2c1.755 3.477 3.242 7.125 5.324 10.394 3.256 5.114 6.731 10.112 10.444 14.904 5.5 7.1 11.23 14.027 16.973 20.937 5.627 6.772 11.48 13.357 17.056 20.17 2.84 3.47 5.187 7.341 7.935 10.893 5.834 7.543 10.985 15.476 14.403 24.425 1.45 3.796 2.149 7.986 4.15 11.442 3.907 6.748 8.365 13.192 12.824 19.603 6.175 8.876 12.41 17.719 18.9 26.365 6.592 8.78 13.87 17.06 20.221 26.003 8.235 11.593 15.962 23.553 23.684 35.499 3.68 5.694 5.848 11.86 6.45 18.888.53 6.18 2.381 12.476 4.856 18.199 2.752 6.361 6.917 12.105 10.376 18.17 2.552 4.473 4.66 9.224 8.677 12.708.415.36.482 1.204.57 1.843.42 3.04.774 6.09 1.181 9.132.794 5.941 1.441 11.91 2.492 17.805.424 2.376 1.505 4.74 2.77 6.813.584.954 2.333 1.196 3.553 1.761.46-1.175 1.34-2.359 1.318-3.525-.194-9.9-.576-19.795-.833-29.694-.031-1.213.343-2.436.529-3.654 1.038.928 2.12 1.814 3.092 2.807.315.321.331.927.508 1.394 1.213 3.19 2.418 6.382 3.651 9.563 3.18 8.206 6.36 16.411 9.565 24.608 1.372 3.507 2.663 7.047 6.95 8.162 2.512.653 3.876-.142 3.49-2.716-.529-3.523-1.243-7.04-2.185-10.475a1105.411 1105.411 0 0 0-7.237-25.171c-.857-2.86-2.204-5.573-3.109-8.423-.33-1.043-.03-2.287-.017-3.44.942.639 1.99 1.17 2.79 1.954.563.55.82 1.432 1.159 2.19 3.57 7.968 7.189 15.916 10.655 23.929 1.013 2.341 1.73 4.838 2.324 7.325.937 3.925 1.728 7.918 5.414 10.306 1.06.686 2.81 1.398 3.691.967.93-.454 1.622-2.242 1.678-3.48.233-5.18-.556-10.18-2.212-15.188-3.652-11.054-6.423-22.403-11.48-32.97-.245-.512-.201-1.164-.367-2.236.802.486 1.22.613 1.446.894 2.912 3.634 5.808 7.281 8.688 10.94 4.376 5.561 8.57 11.276 13.163 16.65 2.888 3.38 6.359 6.27 11.456 4.802v-3c-1.267-2.277-2.425-4.624-3.823-6.818" opacity=".525" transform="scale(0.31,0.31), translate(566, 163)"></path>

                <path onClick={()=>handleSetDialogOpen("back")} className="hover:fill-blue-500 cursor-pointer fill-blue-200/5"  d="M.693 129.272c-.65 12.363 1.892 24.257 4.782 36.185 2.268 9.359 3.745 18.92 5.335 28.431 2.147 12.837 2.497 25.833 2.887 38.808.117 3.895-.337 7.807-.53 11.711-.462 9.302-.713 18.622-1.47 27.9-.37 4.518-1.06 9.074-2.158 13.482 15.997.887 31.803 3.983 47.706 5.847 16.606 1.946 33.495 2.04 50.2 2.014 8.491-.013 16.985-.227 25.458-.79 7.855-.52 15.62-1.655 23.449-2.393 8.995-.85 18.03-1.526 26.96-2.908-1.102-4.574-1.854-9.223-2.067-13.99-.35-7.893-.176-15.827-.897-23.682-.65-7.06-1.291-14.052-.844-21.16.397-6.305.03-12.657.42-18.964 1.034-16.723 3.333-33.273 6.99-49.648 2.339-10.474 4.214-21.05 6.32-31.576.098-.493.408-.947.877-1.963-3.671-43.372-10.267-87.447-34.085-124.659-.729-.422-1.457-.845-2.18-1.277-1.33.405-2.665.789-4.006 1.152-20.617 5.582-42.291 6.704-63.544 5.655C72.493 6.57 54.778 4.11 37.314.537c-.408.22-.82.436-1.232.652-5.05 9.125-10.877 17.783-16.332 26.667C14.608 36.23 9.767 44.88 6.56 54.201 3.004 64.526 2.465 75.196 1.862 86.012 1.11 99.518.72 113.038.29 126.556l.095-.098c.165 1.429.345 2.127.31 2.814" opacity=".525" transform="scale(0.32,0.32), translate(386,155)"></path>

                <path onClick={()=>handleSetDialogOpen("butt")} className="hover:fill-blue-500 cursor-pointer fill-blue-200/5"  d="M113.82 131.773c8.917-3.744 18.112-6.778 27.195-10.099 9.833-3.594 19.587-7.588 28.412-13.286 8.619-5.564 16.922-11.615 24.82-18.164 6.253-5.186 12.22-10.682 17.95-16.418-.762-6.433-1.61-12.852-2.76-19.213-1.579-8.724-4.484-17.211-6.875-25.783-1.36-4.877-2.66-9.789-4.369-14.548-1.392-3.878-2.645-7.783-3.644-11.741-9.715 1.486-19.528 2.117-29.304 3.149-8.432.89-16.794 1.968-25.27 2.427-8.628.467-17.272.596-25.912.543-17.079-.104-34.159-.434-51.109-2.665-14.2-1.87-28.364-4.426-42.675-5.2-.084.32-.164.64-.253.956-2.465 8.802-5.418 17.47-8.32 26.144-5.366 16.03-8.84 32.42-9.959 49.307-.437 6.62-.79 13.253-1.233 19.876 5.663 3.717 11.794 6.676 18.055 9.273 6.995 2.9 14.163 5.354 21.288 7.91 6.96 2.498 13.744 5.308 20.552 8.183 12.445 5.257 25.149 9.612 38.418 11.76 1.29-2.046 3.157-3.711 5.458-5.035 2.73-1.57 6.07-1.142 8.24 1.187.439.472.868.954 1.295 1.437" opacity=".525" transform="scale(0.31,0.29), translate(392, 488)"></path>

                <path onClick={()=>handleSetDialogOpen("legs")} className="hover:fill-blue-500 cursor-pointer fill-blue-200/5"  d="M177.75 681.441c-.058-2.792.002-5.726-.826-8.334-2.31-7.28-5.472-14.31-7.473-21.662-1.265-4.65-1.028-9.704-1.511-14.573-.542-5.457-2.117-10.645-4.888-15.348-1.407-2.385-1.676-4.525-.812-7.083 1.566-4.635 1.557-9.264-.112-13.953-2.427-6.818-4.682-13.698-6.923-20.58-2.918-8.963-2.887-18.106-2.08-27.42 1.317-15.17 2.475-30.37 3.04-45.582.62-16.721.347-33.474.78-50.204.13-5.022.98-10.092 2.09-15.008 2.4-10.616 4.137-21.219 2.908-32.164a295.995 295.995 0 0 0-9.784-49.183c-1.73-5.995-4.227-11.796-5.573-17.865-1.81-8.16-4.973-15.632-8.99-22.892-1.824-3.296-3.368-6.941-4.07-10.614-.98-5.112-.984-10.406-1.525-15.609-.939-9.019-1.987-18.026-2.955-27.042-1.097-10.21-2.94-20.265-6.073-30.065-2.058-6.439-3.517-12.906-3.216-19.817a1039.36 1039.36 0 0 0 1-41.196c.065-16.906-.684-33.774-3.622-50.493-2.047-11.647-3.527-23.393-5.619-35.031-2.178-12.126-5.23-24.108-7.088-36.277-1.97-12.908-2.908-25.971-4.435-38.95C99.429 9.702 98.908 4.9 98.349.101 84.824 13.56 69.743 26.058 53.354 35.863 36.912 45.699 18.089 50.236.51 57.563a161.808 161.808 0 0 1 4.124 5.022c.475.598.78 1.491.81 2.262.38 9.483.417 18.988 1.101 28.447.66 9.116 1.328 18.318 3.184 27.235 1.683 8.086 4.964 15.84 7.555 23.736 4.023 12.258 7.969 24.541 12.118 36.755 3.452 10.162 6.944 20.32 10.812 30.327 2.452 6.345 5.807 12.315 6.99 19.157.851 4.915 2.197 9.746 3.302 14.618 2.647 11.683 5.261 23.373 7.943 35.047.445 1.938 1.021 3.871 1.775 5.71 3.568 8.693 7.72 17.184 10.714 26.067 3.876 11.497 6.962 23.267 10.175 34.978 1.927 7.024.645 14.212.71 21.349.118 12.801.893 25.627 2.081 38.379 1.23 13.202 3.582 26.286 9.495 38.35 6.872 14.019 9.56 29.252 12.925 44.242 2.567 11.439 4.17 23.11 5.862 34.727 1.534 10.544 2.794 21.095 1.09 31.836-2.57 16.202-3.562 32.467.313 48.662 2.336 9.764 2.592 19.503.904 29.479-.975 5.758-1.129 11.882-.328 17.658 1.22 8.792.557 17.329-1.557 25.752-1.695 6.753-.13 12.438 3.843 17.794.375.506.765 1.18.75 1.767-.133 5.46 3.43 8.3 7.627 10.454 4.812 2.47 8.543 1.418 11.813-2.848.271-.353.677-.603 1.055-.931.27.32.491.481.573.695 2.088 5.457 6.943 6.293 11.11 1.983.402-.415 1.492-.536 2.097-.323 4.276 1.509 6.126.749 7.78-3.352.085-.21.316-.36.471-.529 4.393 2.28 5.346 1.94 7.506-2.29.269-.525 1.444-.975 2.09-.857 3.286.6 4.76.335 6.046-2.401 1.038-2.204 1.535-4.726 1.906-7.163.397-2.604.531-5.278.476-7.916" opacity=".525" transform="scale(0.32,0.315), translate(490,516)"></path>

                <path onClick={()=>handleSetDialogOpen("legs")} className="hover:fill-blue-500 cursor-pointer fill-blue-200/5"  d="M156.597 33.014c-15.162-4.664-29.48-11.707-44.417-17.026C99.957 11.635 87.374 7.308 76.433.206c-.41 5.964-.904 11.918-1.62 17.844-1.77 14.621-4.507 29.127-6.87 43.675-1.975 12.168-3.871 24.35-6.061 36.48-3.54 19.604-4.105 39.413-4.181 59.236-.052 13.484.392 26.974.81 40.455.182 5.93-2.34 11.193-3.484 16.79-2.05 10.023-4.15 20.035-6.11 30.074-2.247 11.503-2.157 23.18-2.664 34.83-.299 6.85-1.619 13.562-5.186 19.832-6.693 11.77-11.156 24.526-14.9 37.511-3.392 11.762-6.589 23.567-8.341 35.729-1.512 10.5-2.785 21.02-1.527 31.595.657 5.516 1.894 11.023 3.48 16.353 2.317 7.788 2.512 15.726 2.818 23.717.73 18.97 1.498 37.94 2.481 56.9a176.34 176.34 0 0 0 2.153 19.868c1.577 9.442-.237 18.575-1.761 27.755-1.539 9.266-5.258 17.874-8.592 26.558-2.243 5.844-2.842 11.497-1.246 17.551.445 1.687.227 3.908-.522 5.49-3.964 8.372-5.859 17.09-5.71 26.364.05 3.087-.683 6.236-1.409 9.273-.966 4.043-2.247 8.012-3.455 11.994a10.965 10.965 0 0 1-1.252 2.677c-2.478 3.885-2.888 8.03-1.99 12.483.439 2.182.17 4.512.652 6.68.546 2.454 1.329 4.926 2.461 7.16 1.129 2.228 3.238 2.693 5.588 1.677.439-.19.935-.246 1.364-.353 3.087 5.114 4.326 5.591 7.95 3.595 1.562 1.521 2.787 3.601 4.49 4.124 1.721.528 3.915-.488 6.223-.883L32.474 687h5.5a60119.7 60119.7 0 0 1 4.097-5.375l7.401 5.375h1.5c1.082-.702 2.141-1.443 3.251-2.097 4.41-2.599 8.616-5.297 7.983-11.45-.063-.614.523-1.328.894-1.945 2.413-4.015 4.907-8.062 4.265-13.004-.684-5.266-1.791-10.475-2.473-15.74-.37-2.861-.596-5.827-.271-8.676.93-8.171.704-16.263-.454-24.397-.77-5.412-1.55-10.915-1.353-16.342.167-4.587 1.918-9.094 2.641-13.688 1.568-9.948 3.067-19.903 1.855-30.053-.591-4.944-1.104-9.952-.98-14.915.177-7.053.885-14.1 1.526-21.135.98-10.777 1.791-21.583 3.245-32.3 1.275-9.392 3.115-18.726 5.113-27.998 1.821-8.449 3.928-16.86 6.406-25.137 1.687-5.63 4.667-10.876 6.315-16.514 5.325-18.214 6.602-37.062 7.059-55.859.44-18.051 3.681-35.543 7.525-53.05 2.214-10.082 6.195-19.47 9.95-28.992 3.16-8.017 6.983-15.834 7.853-24.634.334-3.37 1.395-6.673 2.19-9.99 1.86-7.764 3.688-15.537 5.661-23.271 1.95-7.642 2.625-15.639 6.325-22.799 1.184-2.29 2.505-4.545 3.38-6.955 3.692-10.156 7.358-20.325 10.81-30.565 4.067-12.067 8.046-24.167 11.793-36.336 2.834-9.206 6.084-18.407 7.622-27.86 1.741-10.715 1.777-21.707 2.559-32.579.405-5.635.694-11.283 1.262-16.902.175-1.734.647-3.29 1.366-4.687a129.446 129.446 0 0 1-17.693-4.115" opacity=".525" transform="scale(0.32,0.315), translate(300,538)"></path>

                <path className="hover:fill-blue-500 cursor-pointer fill-blue-200/5"  opacity=".525"></path>

                <path className="hover:fill-blue-500 cursor-pointer fill-blue-200/5"  opacity=".525"></path>
            </svg>
    )
}

export default MaleBack