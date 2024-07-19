import React from 'react';
import { FacebookEmbed, InstagramEmbed, LinkedInEmbed, PinterestEmbed, TikTokEmbed, XEmbed, YouTubeEmbed} from 'react-social-media-embed';
import MicroLink from '@microlink/react';
import { Twitter } from '@mui/icons-material';
import Microlink from '@microlink/react';

interface LinkRendererProps {
    url: string;
}

const LinkRenderer: React.FC<LinkRendererProps> = ({ url }) => {
    const getEmbedComponent = (url: string) => {
        if (url.includes('facebook.com')) {
            return <FacebookEmbed url={url} width={500} />;
        } else if (url.includes('instagram.com')) {
            return <InstagramEmbed url={url} width={500} captioned />;
        // } else if (url.includes('linkedin.com')) {
        //     return <LinkedInEmbed url={url} width={570} height={325} />;
        } else if (url.includes('pinterest.com')) {
            return <PinterestEmbed url={url} width={500} />;
        } else if (url.includes('tiktok.com')) {
            return <TikTokEmbed url={url} width={325} />;
        } else if (url.includes('x.com')) {
            return <XEmbed url={url} width={500} />;
        } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
            return <YouTubeEmbed url={url} width={500} height={340} />
        } else {
            return <Microlink url={url} style={{borderRadius: '10px', minWidth: '500px'}} />;
        }
    };

    return <div>{getEmbedComponent(url)}</div>;
};

export default LinkRenderer;