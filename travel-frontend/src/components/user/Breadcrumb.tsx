import React from 'react'
import { Link } from 'react-router-dom'

interface BreadcrumbProps {
    title: string;
    links: { name: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, links }) => {
    return (
        <div className="breadcrumb bg-[#f3f2ee] py-10 mt-6">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb__text">
                        <h4 className='text-center text-5xl'>{title}</h4>
                        <div className="flex gap-2 justify-center mt-4">
                            {links.map((link, index) => (
                                <React.Fragment key={index}>
                                    <Link to={link.href}>{link.name}</Link>
                                    {index < links.length - 1 && <span>/</span>}
                                </React.Fragment>
                            ))}
                            <span className="opacity-50">/ {title}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb