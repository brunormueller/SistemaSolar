import {HiOutlineLogin} from 'react-icons/hi'
import Link from 'next/link';
import router from 'next/router';
const Error403 = () => {
    const handleBackLogin = ()=>{
        router.push('/')
    }
    return (
        <div className="flex items-center justify-center h-screen" style={{
            backgroundImage: `url('/images/cover/logo-linksun-2.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: '29rem',
            backgroundSize: 'cover'
        }}>
            <div className="grid flex-wrap items-center place-items-center justify-center">

                <span className='text-error-xxl font-semibold mb-10'>403</span>
                {/* <Image height={270} width={270} src={loadersun} alt='403' /> */}
                <div className="flex gap-2 text-3xl mb-6">
                <span className='font-semibold'>Proibido!</span><span>Acesso não autorizado</span>
                </div>
                {/* <div className="flex"> */}
                <Link className='pt-7 flex items-center gap-1 hover:text-secondaryMenu' onClick={handleBackLogin} href={''}>{<HiOutlineLogin/>}Voltar ao Login</Link>
                {/* </div> */}
            </div>
        </div>
    );
}

export default Error403;