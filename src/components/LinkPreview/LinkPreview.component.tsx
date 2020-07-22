import React, { useState, useEffect, useRef, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const LinkPreview = ({ children }: Props) => {
    const [showPreview, setshowPreview] = useState(false);
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const outerDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (outerDivRef.current !== null) {
            if (outerDivRef.current.lastElementChild?.firstElementChild !== null) {
                const link = outerDivRef.current.lastElementChild?.firstElementChild.getAttribute('href');
                if (link !== null && link !== '') {
                    setUrl(link as string);
                }
            }
        }
    }, []);

    function showLinkPreview(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
        if (url !== '') {
            fetch(url)
                .then(res => {
                    setshowPreview(true);
                    return res.text();
                })
                .then(htmlContent => {
                    var matches = htmlContent.match(/<title>(.*?)<\/title>/);
                    if (matches !== null) {
                        setTitle(matches[0].split('>')[1].split('<')[0])
                    }
                })
                .catch(res => console.log("Error appeared:" + res))
        }
    }

    function hideLinkPreview(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
        setshowPreview(false);
    }
    return (
        <div ref={outerDivRef} onMouseEnter={showLinkPreview} onMouseLeave={hideLinkPreview}>
            {
                showPreview &&
                <iframe src={url} title={title} className="linkPreviewFrame"></iframe>
            }
            {
                children
            }
        </div>
    )
}

export default LinkPreview
