import "./MentionList.css";
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";

export default forwardRef((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index) => {
        const item = props.items[index];

        if (item) {
            props.command({
                id: item.id,
                label: item.firstName + " " + (item.lastName || ""),
            });
        }
    };

    const upHandler = () => {
        setSelectedIndex(
            (selectedIndex + props.items.length - 1) % props.items.length
        );
    };

    const downHandler = () => {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
        selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }) => {
            if (event.key === "ArrowUp") {
                upHandler();
                return true;
            }

            if (event.key === "ArrowDown") {
                downHandler();
                return true;
            }

            if (event.key === "Enter") {
                enterHandler();
                return true;
            }

            return false;
        },
    }));

    return (
        <div className="flex flex-col bg-white ring-offset-2 ring-1 ring-gray-300 rounded-sm py-1 m-0">
            {props.items.length ? (
                props.items.map((item, index) => (
                    <button
                        className={`item ${
                            index === selectedIndex ? "is-selected" : ""
                        }`}
                        key={index}
                        onClick={() => selectItem(index)}
                    >
                        <div className="flex gap-4 items-center">
                            <Avatar className="w-7 h-7">
                                <AvatarImage
                                    src={item.picture}
                                    alt="@shadcn"
                                />
                                <AvatarFallback><User2 /></AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-[15px]">{item.firstName} {item.lastName ? item.lastName : ""}</span>
                        </div>
                    </button>
                ))
            ) : (
                <div className="item">No result</div>
            )}
        </div>
    );
});
