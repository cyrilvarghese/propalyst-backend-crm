import { motion } from "motion/react"
import { Spinner } from "./spinner"

export default function SpinnerCustom(props: { text: string }) {
    return (
        <div className="flex items-center pl-4 p-6 justify-center">
            <Spinner className="mr-2 size-4" />
            <span className="text-shimmer text-sm font-medium">
                {props.text}
            </span>
        </div>
    )
}