const Footer = () => {
    return (
        <footer className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 border-t border-gray-200 dark:border-zinc-700">
            © {new Date().getFullYear()} Quick Note. All rights reserved.
        </footer>
    );
};

export default Footer;