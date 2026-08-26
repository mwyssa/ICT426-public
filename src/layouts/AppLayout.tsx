import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
 children: ReactNode;
};

export default function AppLayout({ children }: Props) {
 return (
     <div className="d-flex vh-100">
      <aside
          className="bg-dark text-white p-3"
          style={{ width: "250px" }}
      >
       <h3 className="mb-4">Budget Famille</h3>

       <nav className="nav flex-column">
        <Link className="nav-link text-white" to="/">
         Dashboard
        </Link>

        <Link className="nav-link text-white" to="/accounts">
         Comptes
        </Link>

        <Link className="nav-link text-white" to="/transactions">
         Transactions
        </Link>

        <Link className="nav-link text-white" to="/envelopes">
         Enveloppes
        </Link>

        <Link className="nav-link text-white" to="/family">
         Famille
        </Link>

        <Link className="nav-link text-white" to="/settings">
         Paramètres
        </Link>
       </nav>
      </aside>

      <main className="flex-grow-1 p-4 bg-light">
       {children}
      </main>
     </div>
 );
}