import { Link, useMatches } from "react-router-dom";
import { Breadcrumb as AntdBreadcrumb } from "antd";

export default function Breadcrumb() {
  const matches = useMatches();
  const validMatches = matches.filter((match) => Boolean((match.handle as any)?.crumb));
  const items = validMatches.map((match, index) => {
    const canLink = match.pathname !== "/" && index !== validMatches.length - 1;
    const crumb = (match.handle as any).crumb();
    return {
      title: canLink ? <Link to={match.pathname}>{crumb}</Link> : crumb,
    };
  });

  return <AntdBreadcrumb items={[{ title: <Link to="/landing">首页</Link> }, ...items]} />;
}
