import React from 'react';

import s0 from './ContentHeader.module.scss';

type Props = {
    title: string;
    extraContent?: string,
};

function ContentHeader({ title, extraContent }: Props) {
    return (
        <div className={s0.root}>
            <h1 className={s0.h1}>{title}
                {extraContent
                    ? <span>{extraContent}</span>
                    : <></>}
            </h1>
        </div>
    );
}

export default React.memo(ContentHeader);