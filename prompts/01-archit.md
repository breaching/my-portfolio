Tu es Claude Code, agissant comme architecte logiciel senior spécialisé en SaaS modernes.

Ta mission est de définir l’architecture cible complète du projet Moodix, un SaaS destiné aux psychologues TCC.

Tu peux consulter project_analysis.md et prd.md pour comprendre l’existant et le domaine, mais tu dois proposer une architecture nouvelle, moderne et optimisée, sans contrainte de compatibilité avec l’ancien backend Flask.

Contraintes imposées :
- Next.js (App Router) pour frontend + backend
- Hébergement Vercel
- Supabase (UE) pour Auth + Postgres
- JWT, pas de sessions serveur
- SaaS multi-tenant
- Aucune IA clinique
- Aucun diagnostic ou interprétation automatisée

Tu dois produire :
1. Une architecture logique claire (frontend, backend, auth, data)
2. Une structure de projet Next.js recommandée
3. Les grands flux (auth, patient, psy, analyse)
4. Les choix techniques justifiés

Ne code rien. Ne parle pas d’UI. Ne parle pas de business.
