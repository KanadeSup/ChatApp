import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import MentionList from './MentionList.jsx'
export default {
    items: ({ query }) => {
        return [
            {name: 'Lea Thompson', age: 57},
            {name: 'Cyndi Lauper', age: 65},
            {name: 'Madonna', age: 65},
            {name: 'Winona Ryder', age: 65},
            {name: 'Cyndi Center', age: 65},
            {name: 'Tom Cruise', age: 65},
        ]
            .filter(item => item.name.toLowerCase().startsWith(query.toLowerCase()))
            .slice(0, 5)
    },

    render: () => {
        let component;
        let popup;

        return {
            onStart: props => {
                component = new ReactRenderer(MentionList, {
                    props,
                    editor: props.editor,
                })

                if (!props.clientRect) {
                    return
                }

                popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                })
            },

            onUpdate(props) {
                component.updateProps(props)

                if (!props.clientRect) {
                    return
                }

                popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                })
            },

            onKeyDown(props) {
                if (props.event.key === 'Escape') {
                    popup[0].hide()

                    return true
                }

                return component.ref?.onKeyDown(props)
            },

            onExit() {
                popup[0].destroy()
                component.destroy()
            },
        }
    },
}