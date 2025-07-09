const Footer = () => {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    return (
        <footer className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 border-t border-gray-200 dark:border-zinc-700">
            © {getCurrentYear} Quick Note. All rights reserved. Dev Rodiyat
        </footer>
    );
};

export default Footer;