'use client';

import katex from 'katex';
import 'katex/dist/katex.min.css';

function Tex({ tex, display = false }: { tex: string; display?: boolean }) {
  const html = katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    strict: 'warn',
  });
  if (display) {
    return <div className="my-2 overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function QuantumEspressoNote() {
  return (
    <section className="mt-8 border-t border-gray-200 pt-6 text-[13px] leading-relaxed text-gray-600">
      <h2 className="mb-2 text-sm font-semibold text-gray-800">
        Real-world Hamiltonians from Quantum ESPRESSO
      </h2>
      <p className="mb-3">
        These matrices are not from Quantum ESPRESSO’s conventional Γ-point setup (<code className="font-mono">K_POINTS gamma</code> / <code className="font-mono">gamma_only</code>).
      </p>
      <p className="mb-3">
        To evaluate the proposed integration of the Ozaki-II scheme into the ChASE eigensolver on realistic electronic-structure problems, we generate dense Kohn–Sham Hamiltonians using Quantum ESPRESSO (QE). In a complex plane-wave basis, these Hamiltonians are generally complex Hermitian. The Ozaki-II error bound employed in this work, however, is formulated for real-valued matrix multiplication. Extending the corresponding error analysis to general complex arithmetic is beyond the scope of the present study.
      </p>
      <p className="mb-3">
        We therefore consider nonmagnetic, scalar calculations at the Γ point, without spin–orbit coupling or magnetic vector potentials. Under these conditions, the Hamiltonian commutes with complex conjugation and admits an equivalent real-symmetric representation. We use norm-conserving pseudopotentials so that the resulting matrices define standard eigenvalue problems.
      </p>
      <p className="mb-3">
        In the QE direct diagonalization implementation used here, the Hamiltonian is explicitly assembled in the full plane-wave basis containing both <Tex tex="\mathbf G" /> and <Tex tex="-\mathbf G" />, yielding <Tex tex="H_c\in\mathbb C^{N\times N}" />. We augment this existing workflow with a basis-transformation step after matrix assembly. QE’s <code className="font-mono">gamma_only</code> packed representation is not used, and <Tex tex="H_c" /> need not have real entries in its original basis.
      </p>
      <p>
        At Γ, the normalized plane waves satisfy
      </p>
      <Tex
        display
        tex="\langle\mathbf r\mid\mathbf G\rangle=\frac{1}{\sqrt{\Omega}}e^{i\mathbf G\cdot\mathbf r},\qquad\overline{\langle\mathbf r\mid\mathbf G\rangle}=\langle\mathbf r\mid-\mathbf G\rangle,"
      />
      <p className="mb-3">
        where <Tex tex="\Omega" /> is the simulation-cell volume. Selecting one representative from each nonzero pair <Tex tex="(\mathbf G,-\mathbf G)" />, we define
      </p>
      <Tex
        display
        tex="|c_{\mathbf G}\rangle=\frac{|\mathbf G\rangle+|-\mathbf G\rangle}{\sqrt{2}},\qquad|s_{\mathbf G}\rangle=\frac{|\mathbf G\rangle-|-\mathbf G\rangle}{i\sqrt{2}}."
      />
      <p>
        These functions are real in real space:
      </p>
      <Tex
        display
        tex="\langle\mathbf r\mid c_{\mathbf G}\rangle=\sqrt{\frac{2}{\Omega}}\cos(\mathbf G\cdot\mathbf r),\qquad\langle\mathbf r\mid s_{\mathbf G}\rangle=\sqrt{\frac{2}{\Omega}}\sin(\mathbf G\cdot\mathbf r)."
      />
      <p className="mb-3">
        The <Tex tex="\mathbf G=0" /> function is retained unchanged. For each pair, the change of basis is represented by the unitary matrix
      </p>
      <Tex
        display
        tex="Q=\frac{1}{\sqrt{2}}\begin{pmatrix}1&-i\\1&i\end{pmatrix},\qquad\bigl(|c_{\mathbf G}\rangle,\ |s_{\mathbf G}\rangle\bigr)=\bigl(|\mathbf G\rangle,\ |-\mathbf G\rangle\bigr)Q."
      />
      <p className="mb-3">
        After grouping the paired basis functions, these blocks and the unchanged zero mode define a unitary matrix <Tex tex="U" />. The transformed Hamiltonian is
      </p>
      <Tex
        display
        tex="H_r=U^\dagger H_cU,\qquad H_r\in\mathbb R^{N\times N},\qquad H_r=H_r^T."
      />
      <p className="mb-3">
        Its entries are real because the basis functions are real and the scalar Hamiltonian commutes with complex conjugation; Hermiticity then implies symmetry. This unitary transformation preserves the dimension and all eigenvalues in exact arithmetic. It requires neither spatial inversion symmetry nor a doubling of the eigenvalue problem.
      </p>
      <p className="mb-3">
        In the implementation, each block between two nonzero reciprocal-vector pairs is transformed directly as
      </p>
      <Tex
        display
        tex="B_{\mathbf G,\mathbf G'}=\begin{pmatrix}(H_c)_{\mathbf G,\mathbf G'}&(H_c)_{\mathbf G,-\mathbf G'}\\(H_c)_{-\mathbf G,\mathbf G'}&(H_c)_{-\mathbf G,-\mathbf G'}\end{pmatrix}\quad\longmapsto\quad Q^\dagger B_{\mathbf G,\mathbf G'}Q."
      />
      <p className="mb-3">
        Entries involving the zero mode are handled separately. Consequently, the transformation costs <Tex tex="O(N^2)" />, without explicitly forming <Tex tex="U" /> or performing general dense matrix multiplications.
      </p>
      <p>
        The implementation checks the Γ-point condition, reciprocal-vector pairing, Hermiticity, and the residual imaginary part after transformation. After these checks, the computed real part <Tex tex="A" /> is explicitly symmetrized as
      </p>
      <Tex display tex="H_{\mathrm{bench}}=\frac{A+A^T}{2}," />
      <p>
        with each symmetric pair assigned the same floating-point value. The full double-precision matrix is exported through MPI-IO as a single dense, column-major binary file. QE also exports the complete spectrum of the original complex Hermitian problem in nondecreasing order, providing reference eigenvalues for validating the transformation and subsequent ChASE computations, subject to floating-point rounding errors.
      </p>
    </section>
  );
}
