import React, { useEffect, useLayoutEffect, useRef } from "react";
import { apiUpdateTask } from "../../../../service/api_calls";

function EventList({
    testpercentage,
    events,
    handleEventClick,
    selectedEvent,
    setSelectedEvent,
    formatDate,
    formatTime,
    eventTaskShow,
    setEventTaskShow,
    tasks,
    toggleTaskSelection,
    isTaskSelected,
    boxHight,
    selectedDate,
    setTop,
    update,
    setUpdate,
    selectedTime,
    setSelectedTime,
    setTasks,
    updateTask,
    setUpdateTask,
    switchContent,
    viewMonthInCalendar,
}) {
    const scrollContainer = useRef(null);
    const scrollContainerInner = useRef(null);
    const positionBoxAtBottom = () => {
        let boxNewHeight = 0;
        if (scrollContainer.current) {
            const windowHeight = window.innerHeight;
            const boxTop = scrollContainer.current.getBoundingClientRect().top;
            const extra = window.innerWidth < 780 ? 0 : 32;
            boxNewHeight = windowHeight - boxTop - extra;
            scrollContainer.current.style.height = `${boxNewHeight}px`;
        }
    };
    const paddingBottom = () => {
        if (scrollContainer.current) {
            scrollContainer.current.style.paddingBottom = `${(scrollContainer.current.getBoundingClientRect().height / 3) * 2}px`;
        }
    };
    useLayoutEffect(() => {
        setTimeout(() => {
            positionBoxAtBottom();
            paddingBottom();
        }, 10);

        window.addEventListener("resize", positionBoxAtBottom);
        window.addEventListener("resize", paddingBottom);
        return () => {
            window.removeEventListener("resize", positionBoxAtBottom);
            window.removeEventListener("resize", paddingBottom);
        };
    }, []);
    useEffect(() => {
        scrollContainer.current.scrollTo({ top: 0, behavior: "smooth" });
    }, [setTop]);

    useEffect(() => {
        // if (selectedEvent && scrollContainer) {
        //     const element = document.getElementById(selectedEvent?.id);
        //     if (element) {
        //         console.log("scroll to", element.offsetTop);
        //         const scrollContainerHightDiv2 = scrollContainer.current.getBoundingClientRect().height / 2;
        //         const elementHightDiv2 = element.getBoundingClientRect().height / 2;
        //         const elementPosition = element.offsetTop - scrollContainerHightDiv2 + elementHightDiv2;
        //         scrollContainer.current.scrollTo({ top: elementPosition, behavior: "smooth" });
        //     }
        // }
    }, [selectedEvent]);
    useEffect(() => {
        // if (selectedDate) {
        //     const element = document.getElementById(
        //         [String(new Date(parseInt(selectedDate ?? null)).getMonth()).padStart(2, "0"), new Date(parseInt(selectedDate)).getFullYear()].join("")
        //     );
        //     const elements = document.getElementsByClassName("monthli");
        //     if (element) {
        //         //element first in elements
        //         const elementFirstInElements = elements[0] == element;
        //         if (elementFirstInElements) {
        //             scrollContainer.current.scrollTo({ top: 0, behavior: "smooth" });
        //             return;
        //         }
        //         const scrollContainerTop = scrollContainer.current.getBoundingClientRect().top;
        //         element.scrollIntoView({ behavior: "smooth", block: "start" });
        //         console.log(element.innerText);
        //     }
        // }
    }, [selectedDate]);
    useEffect(() => {
        if (viewMonthInCalendar) {
            const element = document.getElementById(viewMonthInCalendar);
            const elements = document.getElementsByClassName("monthli");
            if (element) {
                //element first in elements
                const elementFirstInElements = elements[0] == element;
                if (elementFirstInElements) {
                    scrollContainer.current.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                }
                const scrollContainerTop = scrollContainer.current.getBoundingClientRect().top;
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                console.log(element.innerText);
            }
        }
    }, [viewMonthInCalendar]);

    return (
        <div ref={scrollContainer} className="overflow-y-scroll">
            <ul className="flex flex-col md:gap-1">
                {events.map((event, i) => (
                    <React.Fragment key={event.id}>
                        {(new Date(parseInt(events[i - 1 < 0 ? 0 : i - 1].start)).toLocaleString("de", { month: "long" }) !=
                            new Date(parseInt(event.start)).toLocaleString("de", { month: "long" }) ||
                            i == 0) && (
                            <li
                                key={[String(new Date(parseInt(event.start)).getMonth()).padStart(2, "0"), new Date(parseInt(event.start)).getFullYear()].join(
                                    ""
                                )}
                                id={[String(new Date(parseInt(event.start)).getMonth()).padStart(2, "0"), new Date(parseInt(event.start)).getFullYear()].join(
                                    ""
                                )}
                                className="text-xl text-black dark:text-white font-semibold sticky top-0 bg-[#d0cbbb] dark:bg-[#716a53] p-1 rounded-b z-20 shadow shadow-gray-300 dark:shadow-gray-700 monthli"
                            >
                                {new Date(parseInt(event.start)).toLocaleString("de", { month: "long", year: "numeric" })}
                            </li>
                        )}
                        <li
                            id={event.id}
                            onClick={() => {
                                handleEventClick({ event });
                            }}
                            className="flex w-full top-0 md:p-1 border  border-gray-300 dark:border-gray-500 rounded-lg shadow shadow-gray-300 dark:shadow-gray-700 z-10 "
                        >
                            <div
                                className={
                                    "w-full border-2 dark:border-gray-700 hover:border-gray-300 rounded-s " +
                                    (event.id === selectedEvent?.id &&
                                        " border-orange-500 hover:border-orange-700 dark:border-orange-500 dark:hover:border-orange-700")
                                }
                            >
                                <div className="flex justify-between px-2 rounded">
                                    <span className="font-semibold text-lg cursor-pointer text-gray-700 dark:text-gray-300 " title={event.description}>
                                        {event.title}
                                    </span>
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 block px-2">
                                    {formatDate(event.start)} {formatTime(event.startTime)}Uhr
                                </div>
                                {event.hasTasks && (
                                    <div className={"relative w-full h-5"} style={{ backgroundColor: event.colors?.light ?? "#fb7f7f" }}>
                                        <div
                                            style={{ width: event.taskpercent + "%", backgroundColor: event.colors?.normal ?? "#ff0000" }}
                                            className="absolut inset-0 h-full"
                                        ></div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                let newShow = eventTaskShow.map((e) => {
                                                    if (e.id === event.id) {
                                                        e.show = !e.show;
                                                    } else {
                                                        toggleTaskSelection(null);
                                                        e.show = false;
                                                    }

                                                    return e;
                                                });
                                                setEventTaskShow(newShow);
                                            }}
                                            className="absolute inset-0 ml-2"
                                        >
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${
                                                    eventTaskShow.find((e) => e.id === event.id)?.show ? "rotate-180" : "rotate-0"
                                                }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                {event.hasTasks && (
                                    <div className={eventTaskShow.length > 0 && eventTaskShow.filter((ets) => ets.id === event.id)[0]?.show ? " " : " hidden "}>
                                        {/* <div
                                            className="cursor-pointer hover:bg-orange-500 hover:text-white"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                
                                            }}
                                        >
                                            Test 1
                                        </div>
                                        <div
                                            className="cursor-pointer hover:bg-orange-500 hover:text-white"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                
                                            }}
                                        >
                                            Test 2
                                        </div>
                                        <div
                                            className="cursor-pointer hover:bg-orange-500 hover:text-white"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                
                                            }}
                                        >
                                            Test 3
                                        </div> */}
                                        {tasks
                                            .filter((t) => t.id_event === event.id)
                                            .map((t, i) => (
                                                <div className="flex justify-between items-center text-gray-700 dark:text-gray-300" key={t.id}>
                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleTaskSelection(t);
                                                        }}
                                                        className={
                                                            " w-full cursor-pointer hover:bg-orange-600 hover:text-white  " +
                                                            (isTaskSelected(t) ? " bg-orange-500 text-white" : " ") +
                                                            (i + 1 === tasks.filter((t) => t.id_event === event.id).length ? " rounded-b-sm " : " ")
                                                        }
                                                    >
                                                        {t.title}
                                                    </div>
                                                    <div className="flex">
                                                        {/* <div
                                                            onClick={async (e) => {
                                                                e.stopPropagation();
                                                                setUpdateTask(t);
                                                                t.todo = !t.todo;
                                                                setTasks([...tasks]);
                                                                await apiUpdateTask(t.id, t);
                                                                setUpdateTask(null);
                                                            }}
                                                            className={"w-6 h-6 m-1 rounded-full " + (t.todo ? "bg-orange-500" : "bg-orange-200")}
                                                        ></div>
                                                        <div
                                                            onClick={async (e) => {
                                                                e.stopPropagation();
                                                                setUpdateTask(t);
                                                                t.in_progress = !t.in_progress;
                                                                setTasks([...tasks]);
                                                                await apiUpdateTask(t.id, t);
                                                                setUpdateTask(null);
                                                            }}
                                                            className={"w-6 h-6 m-1 rounded-full " + (t.in_progress ? "bg-yellow-500" : "bg-yellow-200")}
                                                        ></div> */}
                                                        <div
                                                            onClick={async (e) => {
                                                                e.stopPropagation();
                                                                setUpdateTask(t);
                                                                t.done = !t.done;
                                                                setTasks([...tasks]);
                                                                await apiUpdateTask(t.id, t);
                                                                setUpdateTask(null);
                                                            }}
                                                            className={"w-6 h-6 m-1 rounded-full " + (t.done ? "bg-green-500" : "bg-green-200")}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                            <div
                                className="w-5 rounded-e"
                                style={{ background: event.color }}
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    setSelectedEvent(event);
                                    switchContent("EditEvent");
                                }}
                            ></div>
                        </li>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default EventList;
